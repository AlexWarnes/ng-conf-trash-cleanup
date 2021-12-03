import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TrashItem, TrashType } from '../DataModels';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class TrashService {

  constructor(
    private UTIL: UtilService
  ) { }

  trashOptions: TrashType[] = ["CHEMICAL", "GLASS", "PLASTIC"]

  private _trashItems: BehaviorSubject<TrashItem[]> = new BehaviorSubject([]);
  public trashItems$: Observable<TrashItem[]> = this._trashItems.asObservable();

  get randomTrashType(): TrashType{
    return this.trashOptions[Math.floor(Math.random() * 3)]
  }
  generateNewTrash(): void {
    let pieceOfTrash = {
      id: this.UTIL.uuid(),
      type: this.randomTrashType,
      position: {
        x: Math.round(Math.random() * (window.innerWidth - 20)),
        y: Math.round(Math.random() * (window.innerHeight - 20)),
      }
    }
    this._trashItems.next([...this._trashItems.value, pieceOfTrash])
  }

  pickUpTrashItem(id: string): void {
    const nextTrash = this._trashItems.value.filter(trash => trash.id !== id)
    this._trashItems.next(nextTrash)
  }

  readTrashType(id: string): TrashType {
    const targetTrash = this._trashItems.value.find(trash => trash.id === id);
    return targetTrash ? targetTrash.type : undefined;
  }

}
