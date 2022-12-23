import * as NapicuConfig from "@Napicu/Config";

import {RouterModule, Routes} from "@angular/router";
import {ConfigurationComponent} from "./components/configuration/configuration.component";
import {TextScreenComponent} from "./components/text-screen/text-screen.component";
import {NgModule} from "@angular/core";
import {BiosTextScreenGuard} from "./guards/text-screen.guard";
import {SplashScreenComponent} from "./components/splash-screen/splash-screen.component";
import { MainComponent } from './components/configuration/components/main/main.component';
import { AdvancedComponent } from './components/configuration/components/advanced/advanced.component';
import { BootComponent } from './components/configuration/components/boot/boot.component';
import { ToolsComponent } from './components/configuration/components/tools/tools.component';
import { ExitComponent } from './components/configuration/components/exit/exit.component';
import {NgComponentOutlet} from "@angular/common";

const routes: Routes = [
  {path: NapicuConfig.Path.BIOS_CONFIGURATION_ROOT_PATH, component: ConfigurationComponent},
  {path: NapicuConfig.Path.BIOS_TEXT_SCREEN_PATH, component: TextScreenComponent, canActivate: [BiosTextScreenGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes), NgComponentOutlet],
  exports: [RouterModule],
  declarations: [
    SplashScreenComponent,
    ConfigurationComponent,
    TextScreenComponent,
    MainComponent,
    AdvancedComponent,
    BootComponent,
    ToolsComponent,
    ExitComponent,
  ]
})
export class BiosModule { }
