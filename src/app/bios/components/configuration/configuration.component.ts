import * as NapicuConfig from "@Napicu/Config";
import * as NapicuComputer from "@Napicu/VirtualComputer";
import * as NapicuBios from "@Napicu/Bios";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {BiosConfigurationOptionsInterface} from "./interface/BiosConfiguration";
import {biosOptionElement} from "./ConfigurationElements";
import {BIOS_OPTIONS} from "../../../config/bios/Options";







@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss',
    "./configuration-style.scss"]
})
export class ConfigurationComponent implements OnInit, OnDestroy{

  protected selected_option_component: number = 0;

  protected readonly options: BiosConfigurationOptionsInterface[] = BIOS_OPTIONS;

  public ngOnInit(): void {
    window.addEventListener("keydown", this.onKeyDownEvent);
  }

  public ngOnDestroy() {
    window.removeEventListener("keydown", this.onKeyDownEvent);
  }

  protected onKeyDownEvent = (e: KeyboardEvent) => {
    if(e.keyCode === NapicuConfig.Bios.BIOS_CONFIGURATION_MOVE_RIGHT) this.move_right_option();
    else if(e.keyCode === NapicuConfig.Bios.BIOS_CONFIGURATION_MOVE_LEFT) this.move_left_option();
    else if(e.keyCode === NapicuConfig.Bios.BIOS_CONFIGURATION_MOVE_UP) this.move_up_option();
    else if(e.keyCode === NapicuConfig.Bios.BIOS_CONFIGURATION_MOVE_DOWN) this.move_down_option();
  }

  public move_right_option(): void {
    if(this.selected_option_component + 1 < this.options.length) this.selected_option_component += 1;
  }

  public move_left_option(): void {
    if(this.selected_option_component > 0) this.selected_option_component -= 1;
  }

  public move_up_option(): void {

  }

  public move_down_option(): void {

  }

  get get_options(): BiosConfigurationOptionsInterface[] {
    return this.options;
  }

  get get_selected_option_item(): BiosConfigurationOptionsInterface {
    return this.options[this.selected_option_component];
  }

  get get_selected_option_index(): number{
    return this.selected_option_component;
  }

  get get_bios_version(): string {
    return NapicuBios.Bios.get_bios_full_version();
  }
}
