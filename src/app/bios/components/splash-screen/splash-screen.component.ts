import {Component, OnDestroy, OnInit} from '@angular/core';
import * as NapicuConfig from "@Napicu/Config";
import * as NapicuComputer from "@Napicu/VirtualComputer";
import * as NapicuUtils from "@Napicu/Utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit, OnDestroy {


  constructor(router: Router) {
    //WebManager
    NapicuUtils.WebManager.set_angular_router(router);

    NapicuComputer.VirtualComputer.start();
  }


  public ngOnInit() {
    //TODO


    window.addEventListener("keydown", this.onKeyDownEvent);
  }

  public ngOnDestroy() {
    window.removeEventListener("keydown", this.onKeyDownEvent);
  }


  protected onKeyDownEvent = (e: KeyboardEvent) => {
    if (e.keyCode == NapicuConfig.Bios.ENTER_BIOS_KEY_1 ||
      e.keyCode == NapicuConfig.Bios.ENTER_BIOS_KEY_2) {
      NapicuComputer.VirtualComputer.enter_bios_configuration();
    }
  }




}
