import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Position, TrashItem } from '../DataModels';
import { filter, debounceTime, tap, withLatestFrom, map, delay } from 'rxjs/operators';
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
  // private _searchingForTrash = new BehaviorSubject<boolean>(false);
  // public searchingForTrash$ = this._searchingForTrash.asObservable();
  public searchingForTrash$ = new Subject();

  // private _boatStorage: BehaviorSubject<Position> = new BehaviorSubject(null);
  // public boatStorage$ = this._boatPosition

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
    this._boatPosition.next({ x: newPosition.x - 20, y: newPosition.y - 20 });
  }
}
