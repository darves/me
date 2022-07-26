import { Component } from '@angular/core';
import { DialogService } from './dialog/dialog.service';
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

  constructor(public dialog: DialogService) {
  }

  onClick() {
    this.dialog.open(YesNoComponent, {data: {
      message: 'Are you sure you want to leave this (awesome) website?'
    }})
  }
}
