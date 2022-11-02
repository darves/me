import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogBoxComponent } from './yes-no.component';

describe('YesNoComponent', () => {
  let component: ConfirmDialogBoxComponent;
  let fixture: ComponentFixture<ConfirmDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
