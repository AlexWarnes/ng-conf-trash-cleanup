import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { BoatService } from './services/boat.service';
import { CollisionService } from './services/collision.service';
import { TrashService } from './services/trash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private BOAT: BoatService,
    private TRASH: TrashService,
    private COLLISION: CollisionService
  ) {}
  trashItems$ = this.TRASH.trashItems$;
  trashInterval: any = null;

  ngOnInit(): void {
    this.BOAT.collisionDetected$.subscribe(trashFound => {
      for (let trash of trashFound){
        // if(this.BOAT.hasCapacityFor(trash.type))
        this.TRASH.pickUpTrashItem(trash.id);
      }
    });
    this.BOAT.updateBoatPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    this.trashInterval = setInterval(() => {
      this.TRASH.generateNewTrash();
    }, 1500);
  }

  ngOnDestroy(): void {
    if (this.trashInterval) clearInterval(this.trashInterval);
  }

  handleOceanClick(event: MouseEvent): void {
    const { clientX, clientY } = event;
    this.BOAT.updateBoatPosition({ x: clientX, y: clientY });
  }
}
