import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoComponent } from './yes-no/yes-no.component';
import { WinDialogComponent } from './win-dialog/win-dialog.component';
import { DialogHostDirective } from './dialog-host.directive';



@NgModule({
  declarations: [
    YesNoComponent,
    WinDialogComponent,
    DialogHostDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DialogModuleCustom { }
