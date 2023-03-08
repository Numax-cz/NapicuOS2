import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Cookies} from "@Napicu/Utils/Cookies";

@Component({
  selector: 'bios-pop-up-cookies',
  templateUrl: './pop-up-cookies.component.html',
  styleUrls: ['./pop-up-cookies.component.scss']
})
export class PopUpCookiesComponent implements OnInit, OnDestroy{

  @Input() public declare onSubmit: () => void;

  public selected_option: boolean = false;

  public ngOnInit() {
    window.addEventListener("keydown", this.onKeyDownEvent);
  }

  public ngOnDestroy() {
    window.removeEventListener("keydown", this.onKeyDownEvent);
  }

  public readonly disable_cookies = (): void => Cookies.disable_cookies();

  public readonly enable_cookies = (): void => Cookies.enable_cookies();

  protected onKeyDownEvent = (e: KeyboardEvent) => {
    if(e.keyCode == 37) this.selected_option = true;
    else if (e.keyCode == 39) this.selected_option = false;
  }
}
