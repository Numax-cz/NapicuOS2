import {RouterModule, Routes} from "@angular/router";
import {CastPipe, ConfigurationComponent} from "./components/configuration/configuration.component";
import {TextScreenComponent} from "./components/text-screen/text-screen.component";
import {NgModule} from "@angular/core";

import {SplashScreenComponent} from "./components/splash-screen/splash-screen.component";
import {NgClass, NgComponentOutlet, NgForOf, NgIf} from "@angular/common";
import {PathConfig} from "../config/web/PathConfig";
const routes: Routes = [
  {path: PathConfig.BIOS_CONFIGURATION_ROOT_PATH, component: ConfigurationComponent},
  {path: PathConfig.BIOS_TEXT_SCREEN_PATH, component: TextScreenComponent},
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
