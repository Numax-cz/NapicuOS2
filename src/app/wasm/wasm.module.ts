import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { WasmConsoleLoggerComponent } from "./test/console-logger.component";



@NgModule({
  declarations: [
    WasmConsoleLoggerComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
})
export class WasmModule {}
