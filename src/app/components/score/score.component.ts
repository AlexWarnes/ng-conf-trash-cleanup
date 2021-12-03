import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoatService } from 'src/app/services/boat.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  constructor(private BOAT: BoatService) {}

  boatStorage$ = this.BOAT.boatStorage$;
  latestDonationFrom$: Observable<string> = this.BOAT.latestDonation$.pipe(
    map((donation) => donation.name)
  );

  ngOnInit(): void {
    this.BOAT.getLatestDonations().subscribe((donation) => {
      this.BOAT.handleIncomingDonation(donation);
    });
  }
}
