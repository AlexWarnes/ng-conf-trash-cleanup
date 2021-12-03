import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject, timer } from 'rxjs';
import {
  BoatStorage,
  Donation,
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
  scan,
  concatMap,
} from 'rxjs/operators';
import { TrashService } from './trash.service';
import { CollisionService } from './collision.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BoatService {
  constructor(
    private TRASH: TrashService,
    private COLLISION: CollisionService,
    private HTTP: HttpClient
  ) {}

  public searchingForTrash$ = new Subject();
  public recycleInProgress$ = new BehaviorSubject(false);
  private _latestDonation = new BehaviorSubject<Donation>(null);
  public latestDonation$ = this._latestDonation
    .asObservable()
    .pipe(filter((d) => !!d));
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
  private _boatDirection = new BehaviorSubject<'right' | 'left'>('right');
  public boatDirection$ = this._boatDirection.asObservable();

  public moveNumber$ = this.boatPosition$.pipe(
    scan((count: number) => count + 1, -1)
  );

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

  recycleZoneDetected$ = this.boatPosition$.pipe(
    debounceTime(1000),
    map((position) => {
      return position.y <= 170;
    })
  );

  updateBoatPosition(newPosition: Position): void {
    if (!this.recycleInProgress$.value) {
      this._boatDirection.next(this.updateBoatDirection(newPosition));
      this._boatPosition.next({ x: newPosition.x - 20, y: newPosition.y - 20 });
    }
  }

  updateBoatDirection(nextPosition: Position): 'right' | 'left' {
    const currentPosition = this._boatPosition.value;
    if (currentPosition && nextPosition.x < currentPosition.x) {
      return 'left';
    } else {
      return 'right';
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
    this.recycleInProgress$.next(true);
    timer(1000).subscribe(() => {
      this.decrementBoatStorage();
      this.recycleInProgress$.next(false);
      // TODO: something cool
    });
  }

  getLatestDonations(): Observable<Donation> {
    return this.HTTP.get<any>('https://tscache.com/lb_recent.json').pipe(
      map((response) => response.recent),
      switchMap((donations: Donation[]) => {
        // Emit a donation every 10 seconds
        return from(donations).pipe(
          concatMap((donation) => {
            return of(donation).pipe(delay(10000));
          })
        );
      })
    );
  }

  handleIncomingDonation(donation: Donation) {
    this._latestDonation.next(donation);

    this.boostMaxStorage();
    this.COLLISION.incrementReach();
  }

  boostMaxStorage(): void {
    const previousStorage = this._boatStorage.value;
    let nextStorage = { ...previousStorage };
    nextStorage.CHEMICAL.maxUnits = nextStorage.CHEMICAL.maxUnits + 1;
    nextStorage.PLASTIC.maxUnits = nextStorage.PLASTIC.maxUnits + 1;
    nextStorage.GLASS.maxUnits = nextStorage.GLASS.maxUnits + 1;

    this._boatStorage.next(nextStorage);
  }
}
