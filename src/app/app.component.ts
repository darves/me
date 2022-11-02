import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { CmdfmComponent } from './dialog/cmdfm/cmdfm.component';
import { ConfirmDialogBoxComponent } from './dialog/confirm-dialog-box/confirm-dialog-box.component';
import { WinDialogService } from './dialog/win-dialog.service';
// import { ConfirmDialogBoxComponent } from './dialog/yes-no/yes-no.component';

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

  onLinkClick(event: MouseEvent) {
    event.preventDefault();
    this.dialog.open(ConfirmDialogBoxComponent, {data: {
      message: 'Are you sure you want to leave this (awesome) website?',
      title: 'Confirm'
    }}).afterClosed().subscribe((result) => {
      if (result) {
        window.location.href = (<HTMLAnchorElement>event.target)?.href;
      }
    })
  }

  onMarioClick() {
    // CmdFmComponent should also be used for playing music but currently we are just running mario
    this.dialog.open(CmdfmComponent, {data: {
      title: 'Mario.exe'
    }})
  }
}
