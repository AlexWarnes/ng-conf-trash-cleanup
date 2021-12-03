import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Position, TrashItem } from '../DataModels';
import { BoatService } from './boat.service';
import { TrashService } from './trash.service';

@Injectable({
  providedIn: 'root',
})
export class CollisionService {
  constructor() {}

  trashReach$ = new BehaviorSubject(40);

  trashFound(boatPosition: Position, trashItems: TrashItem[]): TrashItem[] {
    const foundTrash = [];
    for (let trash of trashItems) {
      if (
        Math.abs(boatPosition.x - trash.position.x) < this.trashReach$.value &&
        Math.abs(boatPosition.y - trash.position.y) < this.trashReach$.value
      ) {
        foundTrash.push(trash);
      }
    }

    return foundTrash;
  }

  incrementReach(){
    this.trashReach$.next(this.trashReach$.value + 5)
  }
}
