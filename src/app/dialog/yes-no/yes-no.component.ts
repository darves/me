import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef } from '../dialog-ref';
import { DIALOG_DATA } from '../dialog-token';

@Component({
  selector: 'app-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.scss']
})
export class YesNoComponent implements OnInit {

  constructor(private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: DialogData,
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
