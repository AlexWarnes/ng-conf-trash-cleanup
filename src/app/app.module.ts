import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { BoatComponent } from './components/boat/boat.component';
import { PieceOfTrashComponent } from './components/piece-of-trash/piece-of-trash.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    BoatComponent,
    PieceOfTrashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
