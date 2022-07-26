import { Component, Inject, OnInit } from '@angular/core';
import { WinDialogRef } from '../dialog-ref';

import { WIN_DIALOG_DATA } from '../win-dialog-token';

@Component({
  selector: 'app-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.scss']
})
export class YesNoComponent implements OnInit {

  constructor(private dialogRef: WinDialogRef,
    @Inject(WIN_DIALOG_DATA) public data: DialogData,
    ) { }

  ngOnInit(): void {
  }

  onYesClick() {
    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.dispose();
  }
}

export interface DialogData {
  title?: string;
  message?: string;
}
