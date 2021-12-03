import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceOfTrashComponent } from './piece-of-trash.component';

describe('PieceOfTrashComponent', () => {
  let component: PieceOfTrashComponent;
  let fixture: ComponentFixture<PieceOfTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieceOfTrashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceOfTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
