import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './bios/components/splash-screen/splash-screen.component';
import { ConfigurationComponent } from './bios/components/configuration/configuration.component';
import { TextScreenComponent } from './bios/components/text-screen/text-screen.component';
import {BiosModule} from "./bios/bios.module";

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    ConfigurationComponent,
    TextScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //NapicuModule
    BiosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
