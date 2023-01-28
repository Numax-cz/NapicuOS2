import {RouterModule, Routes} from "@angular/router";
import * as NapicuConfig from "@Napicu/Config";
import * as NapicuComputer from "@Napicu/VirtualComputer";
import {NgModule} from "@angular/core";
import {NgClass, NgComponentOutlet, NgForOf, NgIf} from "@angular/common";

const routes: Routes = [
  {path: NapicuConfig.Path.SYSTEM_PATH}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgComponentOutlet, NgForOf, NgClass, NgIf],
  exports: [RouterModule],
})
export class KernelModule { }
