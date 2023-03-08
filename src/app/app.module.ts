import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BiosModule} from "./bios/bios.module";
import {GrubModule} from "./kernel/grub/grub.module";
import {KernelModule} from "./kernel/kernel.module";
import {TestSystemComponent} from './system/TestSystem/components/system/system.component';
import {SystemComponent} from "./system/NapicuOS/components/system/system.component";

@NgModule({
  declarations: [
    AppComponent,
    TestSystemComponent,
    SystemComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //NapicuModule
    BiosModule,
    GrubModule,
    KernelModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
