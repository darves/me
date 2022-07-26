import { DialogModule } from '@angular/cdk/dialog';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WinDialogModuleCustom } from './dialog/win-dialog.module';
import { SceneModule } from './scene/scene.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SceneModule,
    DialogModule,
    WinDialogModuleCustom,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
