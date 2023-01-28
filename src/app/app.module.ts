import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BiosModule} from "./bios/bios.module";
import { MenuComponent } from './system/grub/components/menu/menu.component';
import {GrubModule} from "./system/grub/grub.module";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //NapicuModule
    BiosModule,
    GrubModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
