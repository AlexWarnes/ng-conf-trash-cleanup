import { Component, OnInit } from '@angular/core';
import { BoatService } from 'src/app/services/boat.service';
import { map, scan } from 'rxjs/operators';
import { CollisionService } from 'src/app/services/collision.service';
@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.scss'],
})
export class BoatComponent implements OnInit {
  rotationMap = {
    up: '-90deg',
    right: '0deg',
    down: '90deg',
    left: '180deg',
  };

  constructor(private BOAT: BoatService, private COLLISION: CollisionService) {}

  boatX$ = this.BOAT.boatPosition$.pipe(map((position) => `${position.x}px`));
  boatY$ = this.BOAT.boatPosition$.pipe(map((position) => `${position.y}px`));
  rotationY$ = this.BOAT.boatDirection$.pipe(
    map((direction) => {
      return direction === 'right' ? 'rotateY(0deg)' : 'rotateY(180deg)';
    })
  );
  searchingForTrash$ = this.BOAT.searchingForTrash$;
  trashReach$ = this.COLLISION.trashReach$;
  ngOnInit(): void {}
}
