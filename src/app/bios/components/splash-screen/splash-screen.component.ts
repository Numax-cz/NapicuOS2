import {Component, OnDestroy, OnInit} from '@angular/core';
import * as NapicuConfig from "@Napicu/Config";
import * as NapicuComputer from "@Napicu/VirtualComputer";
import * as NapicuUtils from "@Napicu/Utils";
import * as NapicuBios from "@Napicu/Bios";
import {Router} from "@angular/router";

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
    NapicuUtils.WebManager.set_angular_router(router);

    NapicuComputer.VirtualComputer.start();
  }

  public ngOnInit() {
    window.addEventListener("keydown", this.onKeyDownEvent);

    this.bios_boot_timeout = setTimeout(() => {
      NapicuBios.Bios.start_boot();
    }, NapicuBios.SpeedControl.calculate_hardware_speed(NapicuConfig.Bios.EXIT_BIOS_SPLASH_SCREEN_DELAY));
  }

  public ngOnDestroy() {
    window.removeEventListener("keydown", this.onKeyDownEvent);
  }

  protected onKeyDownEvent = (e: KeyboardEvent) => {
    if (e.keyCode == NapicuConfig.Bios.ENTER_BIOS_KEY_1 ||
      e.keyCode == NapicuConfig.Bios.ENTER_BIOS_KEY_2) {
      clearTimeout(this.bios_boot_timeout);
      NapicuComputer.VirtualComputer.enter_bios_configuration();
    }
  }
}
