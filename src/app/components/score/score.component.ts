import { Component, OnInit } from '@angular/core';
import { BoatService } from 'src/app/services/boat.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  constructor(
    private BOAT: BoatService
  ) { }

  boatStorage$ = this.BOAT.boatStorage$;

  ngOnInit(): void {
  }

}
