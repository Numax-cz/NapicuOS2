import {Component, OnDestroy, OnInit} from '@angular/core';
import {CopyArray} from "@Napicu/Utils/CopyArray";
import {Bios} from "@Napicu/Bios/Bios";

@Component({
  selector: 'app-flash-screen',
  templateUrl: './flash-screen.component.html',
  styleUrls: ['./flash-screen.component.scss']
})
export class FlashScreenComponent implements OnInit, OnDestroy{

  public ngOnInit() {
    window.addEventListener("keydown", this.onKeyDownEvent);
  }

  public ngOnDestroy() {
    window.removeEventListener("keydown", this.onKeyDownEvent);
  }

  protected onKeyDownEvent = (e: KeyboardEvent): void => {

  }
}
