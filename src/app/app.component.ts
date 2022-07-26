import { Component } from '@angular/core';
import { CmdfmComponent } from './dialog/cmdfm/cmdfm.component';
import { WinDialogService } from './dialog/win-dialog.service';
import { YesNoComponent } from './dialog/yes-no/yes-no.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly startedWithFrontend = 2013;
  title = 'darves';

  yearsOfExpirience = new Date().getFullYear() - this.startedWithFrontend;

  constructor(public dialog: WinDialogService) {
  }

  onClick() {
    this.dialog.open(CmdfmComponent, {data: {
      message: 'Are you sure you want to leave this (awesome) website?',
      title: 'Mario.exe'
    }})
  }
}
