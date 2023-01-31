import {WebManager} from "@Napicu/Utils/WebManager";
import {BiosConfig} from "@Napicu/Config/bios/Bios";
import {Cookies, CookiesCookiesPermissionsEnum} from "@Napicu/Utils/Cookies";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {VirtualComputer} from "../../../computer/VirtualComputer";
import {SpeedControl} from "../../scripts/SpeedControl";
import {Bios} from "../../Bios";

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit, OnDestroy {
  protected declare bios_boot_timeout: number;

  constructor(router: Router) {
    this.bios_boot_timeout = -1;
    //WebManager
    WebManager.set_angular_router(router);

    if(!this.get_is_cookies_permission_unchecked()) this.start();
  }

  public ngOnInit() { }

  public ngOnDestroy() {
    window.removeEventListener("keydown", this.onKeyDownEvent);
  }

  protected start = (): void => {
    VirtualComputer.start();

    window.addEventListener("keydown", this.onKeyDownEvent);
    this.bios_boot_timeout = setTimeout(() => {
      Bios.start_boot();
    }, SpeedControl.calculate_hardware_speed(BiosConfig.EXIT_BIOS_SPLASH_SCREEN_DELAY));
  }

  protected onKeyDownEvent = (e: KeyboardEvent) => {
    if (e.keyCode == BiosConfig.ENTER_BIOS_KEY_1 ||
      e.keyCode == BiosConfig.ENTER_BIOS_KEY_2) {
      clearTimeout(this.bios_boot_timeout);
      VirtualComputer.enter_bios_configuration();
    }
  }

  public get_is_cookies_permission_unchecked(): boolean {
    return Cookies.get_cookies_permission() == CookiesCookiesPermissionsEnum.unchecked;
  }
}
