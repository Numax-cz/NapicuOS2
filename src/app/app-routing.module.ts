import * as NapicuConfig from "@Napicu/Config";

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SplashScreenComponent} from "./bios/components/splash-screen/splash-screen.component";


const routes: Routes = [
  {path: '', component: SplashScreenComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
