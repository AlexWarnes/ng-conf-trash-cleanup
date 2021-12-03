import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import {
  BoatStorage,
  Position,
  StorageData,
  TrashItem,
  TrashType,
} from '../DataModels';
import {
  filter,
  debounceTime,
  tap,
  withLatestFrom,
  map,
  delay,
  switchMap,
} from 'rxjs/operators';
import { TrashService } from './trash.service';
import { CollisionService } from './collision.service';

@Injectable({
  providedIn: 'root',
})
export class BoatService {
  constructor(
    private TRASH: TrashService,
    private COLLISION: CollisionService
  ) {}

  public searchingForTrash$ = new Subject();
  private _recycleInProgress = new BehaviorSubject(false);
  defaultBoatStorage: BoatStorage = {
    PLASTIC: { storedUnits: 0, maxUnits: 2 } as StorageData,
    GLASS: { storedUnits: 0, maxUnits: 2 } as StorageData,
    CHEMICAL: { storedUnits: 0, maxUnits: 2 } as StorageData,
  };
  private _boatStorage = new BehaviorSubject<BoatStorage>(
    this.defaultBoatStorage
  );
  public boatStorage$ = this._boatStorage.asObservable();

  private _boatPosition: BehaviorSubject<Position> = new BehaviorSubject(null);
  public boatPosition$ = this._boatPosition
    .asObservable()
    .pipe(filter((p) => !!p));

  collisionDetected$ = this.boatPosition$.pipe(
    debounceTime(1000),
    tap(() => this.searchingForTrash$.next(true)),
    withLatestFrom(this.TRASH.trashItems$),
    map(([boatPosition, trashItems]) => {
      return this.COLLISION.trashFound(boatPosition, trashItems);
    }),
    delay(500),
    tap(() => this.searchingForTrash$.next(false)),
    filter((trashFound) => trashFound.length > 0)
  );

  updateBoatPosition(newPosition: Position): void {
    if (!this._recycleInProgress.value) {
      this._boatPosition.next({ x: newPosition.x - 20, y: newPosition.y - 20 });
    }
  }

  hasCapacityFor(trashType: TrashType): boolean {
    const { storedUnits, maxUnits } = this._boatStorage.value[trashType];
    return storedUnits < maxUnits;
  }

  collectTrash(trash: TrashItem): void {
    this.TRASH.pickUpTrashItem(trash.id);
    this.incrementBoatStorage(trash.type);
  }

  incrementBoatStorage(trashType: TrashType): void {
    const previousStorage = this._boatStorage.value;
    const nextStorage: BoatStorage = {
      ...previousStorage,
      [trashType]: {
        ...previousStorage[trashType],
        storedUnits: previousStorage[trashType].storedUnits + 1,
      },
    };

    this._boatStorage.next(nextStorage);
  }

  decrementBoatStorage(): void {
    const previousStorage = this._boatStorage.value;
    let nextStorage = { ...previousStorage };
    nextStorage.CHEMICAL.storedUnits = 0;
    nextStorage.PLASTIC.storedUnits = 0;
    nextStorage.GLASS.storedUnits = 0;

    this._boatStorage.next(nextStorage);
  }

  initRecycling(): void {
    timer(1000)
    .pipe(
      tap(() => {
          this._recycleInProgress.next(true);
          this.decrementBoatStorage();
        }),
        switchMap(() => timer(500)),
        tap(() => this._recycleInProgress.next(false))
      )
      .subscribe(() => {
        console.log('Recycling Complete');
        // Do something cool
      });
  }
}
