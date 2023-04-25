import {NgModule} from '@angular/core';
import {NgClass, NgComponentOutlet, NgForOf, NgIf} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {KernelComponent} from "./components/kernel/kernel.component";
import {IsRunningGuard} from "@Napicu/VirtualComputer/guards/is-running-guard.service";
import {PathConfig} from "@Napicu/Config/web/PathConfig";
import {TerminalComponent} from "@Napicu/System/Kernel/components/terminal/terminal.component";


const routes: Routes = [
  {path: PathConfig.SYSTEM_PATH, component: KernelComponent, canActivate: [IsRunningGuard]},
];

@NgModule({
  declarations: [
    KernelComponent,
    TerminalComponent
  ],
  imports: [RouterModule.forRoot(routes), NgComponentOutlet, NgForOf, NgClass, NgIf],
  exports: [RouterModule],
})
export class KernelModule { }
