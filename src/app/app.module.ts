import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LampComponent } from './lamp/lamp.component';
import { MaterialModule } from './modules/material.module';
import { MainComponent } from './main/main.component';
import { AddLampComponent } from './add-lamp/add-lamp.component';

@NgModule({
  declarations: [
    AppComponent,
    LampComponent,
    MainComponent,
    AddLampComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
