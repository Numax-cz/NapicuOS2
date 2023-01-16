import * as NapicuConfig from "@Napicu/Config";

import {RouterModule, Routes} from "@angular/router";
import {CastPipe, ConfigurationComponent} from "./components/configuration/configuration.component";
import {TextScreenComponent} from "./components/text-screen/text-screen.component";
import {NgModule} from "@angular/core";
import {BiosTextScreenGuard} from "./guards/text-screen.guard";
import {SplashScreenComponent} from "./components/splash-screen/splash-screen.component";
import {NgClass, NgComponentOutlet, NgForOf, NgIf} from "@angular/common";
const routes: Routes = [
  {path: NapicuConfig.Path.BIOS_CONFIGURATION_ROOT_PATH, component: ConfigurationComponent},
  {path: NapicuConfig.Path.BIOS_TEXT_SCREEN_PATH, component: TextScreenComponent, canActivate: [BiosTextScreenGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgComponentOutlet, NgForOf, NgClass, NgIf],
  exports: [RouterModule],
  declarations: [
    SplashScreenComponent,
    ConfigurationComponent,
    TextScreenComponent,
    CastPipe
  ]
})
export class BiosModule { }
