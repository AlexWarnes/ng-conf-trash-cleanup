import { Component, Input, OnInit } from '@angular/core';
import { TrashItem } from 'src/app/DataModels';

@Component({
  selector: 'app-piece-of-trash',
  templateUrl: './piece-of-trash.component.html',
  styleUrls: ['./piece-of-trash.component.scss']
})
export class PieceOfTrashComponent implements OnInit {
  @Input() trash: TrashItem;
  constructor() { }

  ngOnInit(): void {
  }

}
