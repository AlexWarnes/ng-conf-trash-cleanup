import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { BoatComponent } from './components/boat/boat.component';
import { PieceOfTrashComponent } from './components/piece-of-trash/piece-of-trash.component';
import { BinComponent } from './components/bin/bin.component';
import { ScoreComponent } from './components/score/score.component';
import { InstructionsComponent } from './components/instructions/instructions.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    BoatComponent,
    PieceOfTrashComponent,
    BinComponent,
    ScoreComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
