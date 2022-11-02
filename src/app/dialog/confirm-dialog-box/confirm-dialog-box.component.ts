import { Component, Inject, OnInit } from '@angular/core';
import { WinDialogRef } from '../dialog-ref';

import { WIN_DIALOG_DATA } from '../win-dialog-token';

@Component({
  selector: 'app-confirm-dialog-box',
  templateUrl: './confirm-dialog-box.component.html',
  styleUrls: ['./confirm-dialog-box.component.scss']
})
export class ConfirmDialogBoxComponent implements OnInit {

  constructor(private dialogRef: WinDialogRef,
    @Inject(WIN_DIALOG_DATA) public data: DialogData,
    ) { }

  ngOnInit(): void {
  }

  onYesClick() {
    this.dialogRef.close(true);
  }

  onNoClick() {
    this.dialogRef.dispose();
  }
}

export interface DialogData {
  title?: string;
  message?: string;
}
