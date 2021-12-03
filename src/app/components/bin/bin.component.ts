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

  ngOnInit(): void {
  }

  handleRecycleClick(){
    this.BOAT.initRecycling();
  }

}
