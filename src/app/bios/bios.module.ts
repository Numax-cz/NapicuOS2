import {RouterModule, Routes} from "@angular/router";
import {CastPipe, ConfigurationComponent} from "./components/configuration/configuration.component";
import {TextScreenComponent} from "./components/text-screen/text-screen.component";
import {NgModule} from "@angular/core";

import {SplashScreenComponent} from "./components/splash-screen/splash-screen.component";
import {NgClass, NgComponentOutlet, NgForOf, NgIf} from "@angular/common";
import {PathConfig} from "../config/web/PathConfig";
import { PopUpCookiesComponent } from './components/pop-up-cookies/pop-up-cookies.component';
import { FlashScreenComponent } from './components/configuration/flash-screen/flash-screen.component';
import {IsRunningGuard} from "@Napicu/VirtualComputer/guards/is-running-guard.service";
import { OptionMenuComponent } from './components/configuration/option-menu/option-menu.component';

const routes: Routes = [
  {path: PathConfig.BIOS_CONFIGURATION_ROOT_PATH, component: ConfigurationComponent, canActivate: [IsRunningGuard]},
  {path: PathConfig.BIOS_TEXT_SCREEN_PATH, component: TextScreenComponent, canActivate: [IsRunningGuard]},
  {path: PathConfig.BIOS_FLASH_PATH, component: FlashScreenComponent, canActivate: [IsRunningGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgComponentOutlet, NgForOf, NgClass, NgIf],
  exports: [RouterModule],
  declarations: [
    SplashScreenComponent,
    ConfigurationComponent,
    TextScreenComponent,
    CastPipe,
    PopUpCookiesComponent,
    FlashScreenComponent,
    OptionMenuComponent
  ]
})
export class BiosModule { }
