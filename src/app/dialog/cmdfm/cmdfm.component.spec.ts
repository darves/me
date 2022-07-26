import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmdfmComponent } from './cmdfm.component';

describe('CmdfmComponent', () => {
  let component: CmdfmComponent;
  let fixture: ComponentFixture<CmdfmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmdfmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmdfmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
