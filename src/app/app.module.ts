import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './bios/components/splash-screen/splash-screen.component';
import { ConfigurationComponent } from './bios/components/configuration/configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    ConfigurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
