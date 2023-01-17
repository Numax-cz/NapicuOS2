import * as NapicuConfig from "@Napicu/Config";
import * as NapicuBios from "@Napicu/Bios";
import * as NapicuUtils from "@Napicu/Utils"
import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import {BiosConfigurationOptionsInterface} from "./interface/BiosConfiguration";
import {BiosClockElement, BiosOptionElement} from "./ConfigurationElements";
import {
  BiosOptionElementTypeAction,
  BiosOptionElementTypeInformation, BiosOptionElementTypeNumbers, BiosOptionElementTypeNumbersNumberInterface,
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

  public BiosOptionElementTypeNumbers!: BiosOptionElementTypeNumbers;

  public selected_screen_option: number = 0;

  public selected_option: number = 0;

  public selected_in_numbers_option: number | null = null;

  public numbers_option_cache: BiosOptionElementTypeNumbersNumberInterface[] | null = null;

  protected static clock_interval: number = 0;

  public static clock_cache: biosOptionFunctionReturn<biosOptionTypeMap["numbers"]> | null = null;

  protected readonly options: BiosConfigurationOptionsInterface[] = [
    {
      name: "Main",
      title: "System Overview",
      options: [
        BiosOptionElement("information", {
          name: "NULL",
          value: "NULL"
        }),
        BiosOptionElement("options", {
          name: "NULL",
          options: ["NULL", "NULL"],
        }, "NULL"),
        BiosOptionElement("information", {
          name: "NULL",
          value: "NULL"
        }),
        BiosOptionElement("numbers", {
          name: "NULL",
          separator: "/",
          numbers: [{value: 10, min: 0, max: 100}, {value: 10, min: 0, max: 100}, {value: 10, min: 0, max: 100}]
        }, "NULL"),
        BiosClockElement("Time")
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
    this.start_clock();
    window.addEventListener("keydown", this.onKeyDownEvent);
  }

  public ngOnDestroy() {
    window.removeEventListener("keydown", this.onKeyDownEvent);
    this.stop_clock();
  }

  public start_clock(): void {
    ConfigurationComponent.clock_interval = setInterval(() => {
      if(!ConfigurationComponent.clock_cache) {
        this.stop_clock();
        return;
      }

      const hours: BiosOptionElementTypeNumbersNumberInterface = ConfigurationComponent.clock_cache.option.numbers[0];
      const minutes: BiosOptionElementTypeNumbersNumberInterface = ConfigurationComponent.clock_cache.option.numbers[1];
      const seconds: BiosOptionElementTypeNumbersNumberInterface = ConfigurationComponent.clock_cache.option.numbers[2];

      if(seconds.value + 1 >= seconds.max){
        seconds.value = seconds.min;
        if(minutes.value + 1 >= minutes.max){
          hours.value = hours.min;
          minutes.value = minutes.min;
          if(hours.value + 1 >= hours.max){
            seconds.value = seconds.min;
            hours.value = hours.min;
            minutes.value = minutes.min;
          } else ConfigurationComponent.clock_cache.option.numbers[0].value = hours.value + 1;
        }else ConfigurationComponent.clock_cache.option.numbers[1].value = minutes.value + 1;
      }else ConfigurationComponent.clock_cache.option.numbers[2].value = seconds.value + 1;
    }, 1000);
  }

  protected stop_clock(): void {
    clearInterval(ConfigurationComponent.clock_interval);
  }

  protected onKeyDownEvent = (e: KeyboardEvent) => {
    if(e.keyCode === NapicuConfig.Bios.BIOS_CONFIGURATION_MOVE_RIGHT) this.move_right_option();
    else if(e.keyCode === NapicuConfig.Bios.BIOS_CONFIGURATION_MOVE_LEFT) this.move_left_option();
    else if(e.keyCode === NapicuConfig.Bios.BIOS_CONFIGURATION_MOVE_UP) this.move_up_option();
    else if(e.keyCode === NapicuConfig.Bios.BIOS_CONFIGURATION_MOVE_DOWN) this.move_down_option();
    else if(e.keyCode === NapicuConfig.Bios.BIOS_CONFIGURATION_ON_ENTER) this.on_select_option();
    else if(e.keyCode === NapicuConfig.Bios.BIOS_CONFIGURATION_ON_ESC) this.on_esc();
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
      case "clock":
        option = i.option as biosOptionTypeMap["numbers"];
        if(this.selected_in_numbers_option !== null) this.start_clock();
        else this.stop_clock();
        this.select_numbers_option(option);
        break;
      case "numbers":
        option = i.option as biosOptionTypeMap["numbers"];
        this.select_numbers_option(option);
        break;
    }
  }

  protected select_numbers_option(option: biosOptionTypeMap["numbers"]): void {
    if (this.selected_in_numbers_option !== null) this.selected_in_numbers_option = null;
    else {
      this.selected_in_numbers_option = 0;
      this.numbers_option_cache = NapicuUtils.CopyArray(option.numbers);
    }
  }

  protected on_esc(): void {
    if(this.numbers_option_cache !== null){
      if(this.selected_in_numbers_option !== null) this.start_clock();
      else this.stop_clock();

      (this.options[this.selected_screen_option].options[this.selected_option].option as biosOptionTypeMap["numbers"]).numbers = this.numbers_option_cache || [];
      this.numbers_option_cache = null;
      this.selected_in_numbers_option = null
    }
  }

  protected reset_selected_option(): void {
    this.selected_option = 0;
    this.selected_in_numbers_option = null;
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
    if(this.selected_in_numbers_option !== null){
      let i: BiosOptionElementTypeNumbers = this.options[this.selected_screen_option].options[this.selected_option].option as biosOptionTypeMap["numbers"];
      if(this.selected_in_numbers_option + 1 < i.numbers.length) this.selected_in_numbers_option++;

      return;
    }

    if(this.selected_screen_option + 1 < this.options.length){
      this.selected_screen_option += 1;
      this.reset_selected_option();
    }
  }

  protected move_left_option(): void {
    if(this.selected_in_numbers_option !== null){
      if(this.selected_in_numbers_option > 0) this.selected_in_numbers_option--;

      return;
    }

    if(this.selected_screen_option > 0){
      this.selected_screen_option -= 1;
      this.reset_selected_option();
    }
  }

  protected move_up_option(): void {
    if(this.selected_in_numbers_option !== null){
      let numbers: BiosOptionElementTypeNumbers = this.options[this.selected_screen_option].options[this.selected_option].option as biosOptionTypeMap["numbers"];
      let number = numbers.numbers[this.selected_in_numbers_option];
      if(number.value < number.max) numbers.numbers[this.selected_in_numbers_option].value++;
      return;
    }

    if(this.selected_option > 0) this.check_previous_option();
  }

  protected move_down_option(): void {
    if(this.selected_in_numbers_option !== null){
      let numbers: BiosOptionElementTypeNumbers = this.options[this.selected_screen_option].options[this.selected_option].option as biosOptionTypeMap["numbers"];
      let number = numbers.numbers[this.selected_in_numbers_option];
      if(number.value > number.min) numbers.numbers[this.selected_in_numbers_option].value--;
      return;
    }

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
