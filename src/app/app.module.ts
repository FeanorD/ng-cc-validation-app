import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

import { ReactiveFormsModule } from '@angular/forms';
import { KeyboardComponent } from './keyboard/keyboard.component';
// import {  }

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    KeyboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
