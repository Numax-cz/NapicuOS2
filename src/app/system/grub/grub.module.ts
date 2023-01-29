import { NgModule } from '@angular/core';
import {NgClass, NgComponentOutlet, NgForOf, NgIf} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MenuComponent} from "./components/menu/menu.component";
import {PathConfig} from "../../config/web/PathConfig";


const routes: Routes = [
  {path: PathConfig.GRUB_MENU_PATH, component: MenuComponent},
];

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [RouterModule.forRoot(routes), NgComponentOutlet, NgForOf, NgClass, NgIf],
  exports: [RouterModule],
})
export class GrubModule { }
