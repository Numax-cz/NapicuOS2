import { NgModule } from '@angular/core';
import {NgClass, NgComponentOutlet, NgForOf, NgIf} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SystemComponent} from "./components/system/system.component";
import {IsRunningGuard} from "../../computer/guards/is-running-guard.service";
import {PathConfig} from "../../config/web/PathConfig";


const routes: Routes = [
  {path: PathConfig.SYSTEM_PATH, component: SystemComponent, canActivate: [IsRunningGuard]},
];

@NgModule({
  declarations: [
    SystemComponent
  ],
  imports: [RouterModule.forRoot(routes), NgComponentOutlet, NgForOf, NgClass, NgIf],
  exports: [RouterModule],
})
export class KernelModule { }
