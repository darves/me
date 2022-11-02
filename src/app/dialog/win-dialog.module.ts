import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ConfirmDialogBoxComponent } from './yes-no/yes-no.component';
import { WinDialogComponent } from './win-dialog/win-dialog.component';
import { DialogHostDirective } from './dialog-host.directive';
import { CmdfmComponent } from './cmdfm/cmdfm.component';
import { DialogModule } from '@angular/cdk/dialog';



@NgModule({
  declarations: [
    // ConfirmDialogBoxComponent,
    WinDialogComponent,
    DialogHostDirective,
    CmdfmComponent
  ],
  imports: [
    CommonModule,
    DialogModule
  ]
})
export class WinDialogModuleCustom { }
