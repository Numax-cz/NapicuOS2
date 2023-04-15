import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BiosModule} from "./bios/bios.module";
import {GrubModule} from "./kernel/grub/grub.module";
import {KernelModule} from "./kernel/kernel.module";
import {TestSystemComponent} from './system/TestSystem/components/system/system.component';
import { WasmModule } from './wasm/wasm.module';

@NgModule({
  declarations: [
    AppComponent,
    TestSystemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //NapicuModule
    BiosModule,
    GrubModule,
    KernelModule,
    WasmModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
