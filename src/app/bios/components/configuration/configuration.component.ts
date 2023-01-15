import * as NapicuConfig from "@Napicu/Config";
import * as NapicuBios from "@Napicu/Bios";
import * as NapicuUtils from "@Napicu/Utils"
import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import {BiosConfigurationOptionsInterface} from "./interface/BiosConfiguration";
import {BiosOptionElement} from "./ConfigurationElements";
import {
  BiosOptionElementTypeAction,
  BiosOptionElementTypeInformation,
  BiosOptionElementTypeOptionMenu, biosOptionFunctionReturn, biosOptionTypeMap
} from "./interface/ConfigurationElements";

@Pipe({ name: 'as', pure: true })
export class CastPipe implements PipeTransform {
  transform<T>(input: unknown, baseItem: T | undefined): T {
    return (input as unknown) as T;
  }
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy{

  public BiosOptionElementTypeInformation!: BiosOptionElementTypeInformation;

  public BiosOptionElementTypeAction!: BiosOptionElementTypeAction;

  public BiosOptionElementTypeOptionMenu!: BiosOptionElementTypeOptionMenu;

  protected selected_screen_option: number = 0;

  protected selected_option: number = 0;


  protected readonly options: BiosConfigurationOptionsInterface[] = [
    {
      name: "Main",
      options: [
        BiosOptionElement("information", {
          name: "NULL",
          value: "NULL"
        }),
        BiosOptionElement("action", {
          name: "NULL",
          value: "NULL",
          action: () => {}
        }),
        BiosOptionElement("information", {
          name: "NULL",
          value: "NULL"
        }),
        BiosOptionElement("action", {
          name: "NULL",
          value: "NULL",
          action: () => {}
        }),
      ]
    },
    {
      name: "Advanced",
      options: []
    },
    {
      name: "Boot",
      options: []
    },
    {
      name: "Tools",
      options: []
    },
    {
      name: "Exit",
      options: []
    }
  ];

  public ngOnInit(): void {
    this.reset_selected_option();
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
    else if(e.keyCode === NapicuConfig.Bios.BIOS_CONFIGURATION_ON_ENTER) this.on_select_option();
  }

  protected on_select_option(): void {
    let option;
    let i: biosOptionFunctionReturn<NapicuUtils.ValueOf<biosOptionTypeMap>> =
      this.options[this.selected_screen_option].options[this.selected_option];

    switch (i.type) {
      case "options":
        option = i.option as biosOptionTypeMap["options"];

        //TODO OPEN OPTION MENU
        break;

      case "action":
        option = i.option as biosOptionTypeMap["action"];

        option.action();
        break;
    }
  }

  protected reset_selected_option(): void {
    this.selected_option = 0;
    this.check_next_option();
  }

  protected check_next_option(): void {
    for(let i = this.selected_option + 1; i < this.options[this.selected_screen_option].options.length; i++){
      if(this.options[this.selected_screen_option].options?.[i].type !== "information"){
        this.selected_option = i;
        break;
      }
    }
  }

  protected check_previous_option(): void {
    for(let i = this.selected_option - 1; i > 0; i--){
      if(this.options[this.selected_screen_option].options?.[i].type !== "information"){
        this.selected_option = i;
        break;
      }
    }
  }

  protected move_right_option(): void {
    if(this.selected_screen_option + 1 < this.options.length){
      this.selected_screen_option += 1;
      this.reset_selected_option();
    }
  }

  protected move_left_option(): void {
    if(this.selected_screen_option > 0){
      this.selected_screen_option -= 1;
      this.reset_selected_option();
    }
  }

  protected move_up_option(): void {
    if(this.selected_option > 0) this.check_previous_option();
  }

  protected move_down_option(): void {
    if(this.selected_option + 1 < this.options[this.selected_screen_option].options.length) this.check_next_option();
  }

  get get_options(): BiosConfigurationOptionsInterface[] {
    return this.options;
  }

  get get_selected_option_index(): number{
    return this.selected_screen_option;
  }

  get get_bios_version(): string {
    return NapicuBios.Bios.get_bios_full_version();
  }
}
