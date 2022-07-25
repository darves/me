import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SceneComponent } from './scene/scene.component';
import { SceneModule } from './scene/scene.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SceneModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [SceneComponent]
})
export class AppModule { }
