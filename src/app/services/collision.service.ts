import { Injectable } from '@angular/core';
import { Position, TrashItem } from '../DataModels';
import { BoatService } from './boat.service';
import { TrashService } from './trash.service';

@Injectable({
  providedIn: 'root',
})
export class CollisionService {
  constructor() {}

  // collisionDetected$ = this.BOAT.boatPosition$.pipe(
  //   tap(() => this.searchingForTrash$.next(true)),
  //   debounceTime(1500),
  //   withLatestFrom(this.TRASH.trashItems$),
  //   map(([boatPosition, trashItems]) => {
  //     return this.trashFound(boatPosition, trashItems);
  //   })
  // );

  trashFound(boatPosition: Position, trashItems: TrashItem[]): TrashItem[] {
    const foundTrash = [];
    for (let trash of trashItems) {
      if (
        Math.abs(boatPosition.x - trash.position.x) < 40 &&
        Math.abs(boatPosition.y - trash.position.y) < 40
      ) {
        foundTrash.push(trash);
      }
    }

    return foundTrash;
  }
}
