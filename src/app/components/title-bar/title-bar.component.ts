import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
})
export class TitleBarComponent implements OnInit {
  constructor(private BREAKPOINT: BreakpointObserver) {}

  displayType$ = new BehaviorSubject<"MOBILE" | "DESKTOP">("DESKTOP")
  ngOnInit(): void {
    // Setup screen displayType observable
    this.BREAKPOINT.observe(['(min-width: 640px)']).subscribe(
      (state: BreakpointState) => {
        if (state.matches) {
          this.displayType$.next('DESKTOP');
        } else {
          this.displayType$.next('MOBILE');
        }
      }
    );
  }
}
