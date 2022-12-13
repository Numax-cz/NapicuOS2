import * as NapicuConfig from "@Napicu/Config";

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SplashScreenComponent} from "./bios/components/splash-screen/splash-screen.component";
import {ConfigurationComponent} from "./bios/components/configuration/configuration.component";

const routes: Routes = [
  {path: '', component: SplashScreenComponent},
  {path: NapicuConfig.Path.BIOS_CONFIGURATION_ROOT_PATH, component: ConfigurationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
