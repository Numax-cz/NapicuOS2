import * as NapicuConfig from "@Napicu/Config";
import * as NapicuComputer from "@Napicu/VirtualComputer";
import { NgModule } from '@angular/core';
import {NgClass, NgComponentOutlet, NgForOf, NgIf} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MenuComponent} from "./components/menu/menu.component";


const routes: Routes = [
  {path: NapicuConfig.Path.GRUB_MENU_PATH, component: MenuComponent},
];

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [RouterModule.forRoot(routes), NgComponentOutlet, NgForOf, NgClass, NgIf],
  exports: [RouterModule],
})
export class GrubModule { }
