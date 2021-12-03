import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BoatService } from 'src/app/services/boat.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
})
export class InstructionsComponent implements OnInit {
  constructor(private BOAT: BoatService) {}

  showInstruction$ = this.BOAT.moveNumber$.pipe(
    map((move) => {
      if (move === 0) {
        return 'STEP_1';
      }
      if (move === 1) {
        return 'STEP_2';
      }
      if (move === 2) {
        return 'STEP_3';
      }

      return false;
    })
  );
  ngOnInit(): void {
    this.showInstruction$.subscribe(console.log)
    this.BOAT.moveNumber$.subscribe(console.log)
  }
}
