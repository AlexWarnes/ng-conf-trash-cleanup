import { Component, OnInit } from '@angular/core';
import { BoatService } from 'src/app/services/boat.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss']
})
export class BinComponent implements OnInit {

  constructor(
    private BOAT: BoatService
  ) { }

  recycleInProgress$ = this.BOAT.recycleInProgress$

  ngOnInit(): void {
    this.BOAT.recycleZoneDetected$.subscribe(recycleZone => {
      console.log("recycleZoneDetected$", recycleZone)
      if(recycleZone){
        this.BOAT.initRecycling();
      }
    })

  }

}
