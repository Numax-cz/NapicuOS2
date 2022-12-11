import {Component, OnDestroy, OnInit} from '@angular/core';
import * as NapicuConfig from "@Napicu/Config";
import * as NapicuComputer from "@Napicu/VirtualComputer"




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
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
      NapicuComputer.VirtualComputer.enterBiosConfiguration();
    }
  }


}
