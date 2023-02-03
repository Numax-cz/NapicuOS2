import {Component, OnDestroy, OnInit} from '@angular/core';
import {CopyArray} from "@Napicu/Utils/CopyArray";
import {Bios} from "@Napicu/Bios/Bios";
import {BiosConfig} from "@Napicu/Config/bios/Bios";

@Component({
  selector: 'app-flash-screen',
  templateUrl: './flash-screen.component.html',
  styleUrls: ['./flash-screen.component.scss']
})
export class FlashScreenComponent implements OnInit, OnDestroy{

  public is_active_drive_selection: boolean = true;

  public selected_drive: number = 0;

  public selected_dir: number = 0;


  public ngOnInit() {
    window.addEventListener("keydown", this.onKeyDownEvent);
  }

  public ngOnDestroy() {
    window.removeEventListener("keydown", this.onKeyDownEvent);
  }

  protected onKeyDownEvent = (e: KeyboardEvent): void => {

  }


  protected on_enter(): void {

  }

  protected on_tab(): void {
    this.is_active_drive_selection = !this.is_active_drive_selection;
  }

  protected on_esc(): void {

  }

  protected move_up(): void {

  }

  protected move_down(): void {

  }

  public get_drives(): any{

  }

  public get_bios_version(): string{
    return BiosConfig.BIOS_VERSION;
  }
}
