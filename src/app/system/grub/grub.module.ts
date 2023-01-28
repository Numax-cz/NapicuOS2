import * as NapicuConfig from "@Napicu/Config";
import * as NapicuComputer from "@Napicu/VirtualComputer";
import { NgModule } from '@angular/core';
import {NgClass, NgComponentOutlet, NgForOf, NgIf} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MenuComponent} from "./components/menu/menu.component";
import {SystemComponent} from "./components/system/system.component";


const routes: Routes = [
  {path: NapicuConfig.Path.GRUB_MENU_PATH, component: MenuComponent, canActivate: [NapicuComputer.Guards.IsRunningGuard]},
];

@NgModule({
  declarations: [
    MenuComponent,
    SystemComponent
  ],
  imports: [RouterModule.forRoot(routes), NgComponentOutlet, NgForOf, NgClass, NgIf],
  exports: [RouterModule],
})
export class GrubModule { }
