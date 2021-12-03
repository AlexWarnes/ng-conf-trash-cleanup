import { Component, OnInit } from '@angular/core';
import { BoatService } from 'src/app/services/boat.service';
import { map } from 'rxjs/operators';
import { CollisionService } from 'src/app/services/collision.service';
@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.scss']
})
export class BoatComponent implements OnInit {

  constructor(
    private BOAT: BoatService,
    private COLLISION: CollisionService
  ) { }

  boatX$ = this.BOAT.boatPosition$.pipe(map(position => `${position.x}px`))
  boatY$ = this.BOAT.boatPosition$.pipe(map(position => `${position.y}px`))
  searchingForTrash$ = this.BOAT.searchingForTrash$;
  trashReach$ = this.COLLISION.trashReach$;
  ngOnInit(): void {
  }

}
