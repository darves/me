import { TestBed } from '@angular/core/testing';

import { WinDialogService } from './win-dialog.service';

describe('DialogService', () => {
  let service: WinDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
