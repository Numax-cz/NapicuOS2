import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import {BiosConfigurationOptionsInterface} from "./interface/BiosConfiguration";
import {
  BiosClockElement,
  BiosDateElement,
  BiosOptionElement,
  BiosOptionEnableDisableElement
} from "./ConfigurationElements";
import {
  BiosOptionElementTypeAction,
  BiosOptionElementTypeInformation,
  BiosOptionElementTypeNumbers,
  BiosOptionElementTypeNumbersNumberInterface,
  BiosOptionElementTypeOptionMenu,
  biosOptionFunctionReturn,
  biosOptionTypeMap
} from "./interface/ConfigurationElements";
import {NapicuDate} from "napicuformatter";
import {Bios} from "../../Bios";
import {CopyArray} from "../../../utils/CopyArray";
import {BiosConfig} from "../../../config/bios/Bios";
import {ValueOf} from "../../../utils/Utils";
import {VirtualComputer} from "@Napicu/VirtualComputer/VirtualComputer";


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

  public static date_cache: biosOptionFunctionReturn<biosOptionTypeMap["numbers"]> | null = null;

  public static date_is_moved_day: boolean = false;

  public selected_menu_option_cache: number | null = null;

  protected readonly options: BiosConfigurationOptionsInterface[] = [
    {
      name: "Main",
      title: "System Overview",
      options: [

        BiosClockElement("System Time", "Change system time"),
        BiosDateElement("System Date", "Change system date"),

        BiosOptionEnableDisableElement("Network Boot", Bios.get_bios_configuration().network_boot, (newValue: number) =>
          Bios.get_bios_configuration().network_boot = newValue, "Enable/Disable PXE boot on to LAN"),
        BiosOptionEnableDisableElement("Wake On LAN", Bios.get_bios_configuration().wake_on_lan, (newValue: number) =>
          Bios.get_bios_configuration().wake_on_lan = newValue, "Enable/Disable Integrated LAN to wake the system"),

        BiosOptionElement("information", {name: "Processor Type",  value:    Bios.get_cpu().name}),
        BiosOptionElement("information", {name: "Processor Speed", value: `${Bios.get_cpu().speed}MHz`}),
        BiosOptionElement("information", {name: "Cache Size",      value: `${Bios.get_cpu().cache}KB`}),
        BiosOptionElement("information", {name: "Total Memory",    value: `${Bios.get_ram_total_memory()}MB`}),
        BiosOptionElement("information", {name: "Serial Number",   value:    Bios.get_serial_number()})
      ]
    },
    {
      name: "Advanced",
      options: [
        BiosOptionEnableDisableElement("AMD-SVM", Bios.get_bios_configuration().amd_svm, (newValue: number) =>
          Bios.get_bios_configuration().amd_svm = newValue, "This is AMD virtualization function switch"),
        BiosOptionEnableDisableElement("AMD-IOMMU", Bios.get_bios_configuration().amd_iommu, (newValue: number) =>
          Bios.get_bios_configuration().amd_iommu = newValue, "This is AMD virtualization function switch"),
      ]
    },
    {
      name: "Boot",
      options: [
        BiosOptionElement("options", {
          name: "Boot",
          options: this.get_drv_with_os_name(),
          selectedOption: Bios.get_bios_configuration().selected_drive,
          onChange: (newValue: number) => Bios.get_bios_configuration().selected_drive = newValue,
        })
      ]
    },
    {
      name: "Tools",
      options: []
    },
    {
      name: "Exit",
      options: [
        BiosOptionElement("action", {
          name: "Load Optimized Defaults",
          action: () => Bios.load_default_bios_configuration()
        }, "Restores/loads the default values for all the setup options"),
        BiosOptionElement("action", {
          name: "Save Changes & Reset",
          action: () => Bios.exit_bios_configuration_with_save()
        }, "Exit Bios and save your changes to CMOS"),
        BiosOptionElement("action", {
          name: "Discard Changes & Exit",
          action: () => Bios.exit_bios_configuration_without_save()
        }, "Exit Bios without saving any changes")
      ]
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
        } else ConfigurationComponent.clock_cache.option.numbers[1].value = minutes.value + 1;
      } else ConfigurationComponent.clock_cache.option.numbers[2].value = seconds.value + 1;
    }, 1000);
  }

  protected stop_clock(): void {
    clearInterval(ConfigurationComponent.clock_interval);
  }

  protected update_max_days_in_month(): void {
    if(ConfigurationComponent.date_cache){
      ConfigurationComponent.date_cache.option.numbers[1].max = new NapicuDate(ConfigurationComponent.date_cache.option.numbers[2].value,
        ConfigurationComponent.date_cache.option.numbers[0].value).getMaxDaysInCurrentMonth();
      if(ConfigurationComponent.date_cache.option.numbers[1].value > ConfigurationComponent.date_cache.option.numbers[1].max || ConfigurationComponent.date_is_moved_day){
        ConfigurationComponent.date_cache.option.numbers[1].value = ConfigurationComponent.date_cache.option.numbers[1].max;
        ConfigurationComponent.date_is_moved_day = true;
      }
    }
  }

  protected onKeyDownEvent = (e: KeyboardEvent) => {
    if(e.keyCode === BiosConfig.BIOS_CONFIGURATION_MOVE_RIGHT) this.move_right_option();
    else if(e.keyCode === BiosConfig.BIOS_CONFIGURATION_MOVE_LEFT) this.move_left_option();
    else if(e.keyCode === BiosConfig.BIOS_CONFIGURATION_MOVE_UP) this.move_up_option();
    else if(e.keyCode === BiosConfig.BIOS_CONFIGURATION_MOVE_DOWN) this.move_down_option();
    else if(e.keyCode === BiosConfig.BIOS_CONFIGURATION_ON_ENTER) this.on_select_option();
    else if(e.keyCode === BiosConfig.BIOS_CONFIGURATION_ON_ESC) this.on_esc();
  }

  protected on_select_option(): void {
    let option;
    let i: biosOptionFunctionReturn<ValueOf<biosOptionTypeMap>> =
      this.options[this.selected_screen_option].options[this.selected_option];


    if(i.type === "options"){
      option = i.option as biosOptionTypeMap["options"];
      if (this.selected_menu_option_cache === null) this.selected_menu_option_cache = option.selectedOption;
      else this.selected_menu_option_cache = null;
      option.onChange(option.selectedOption);

    }else if (i.type === "action"){
      option = i.option as biosOptionTypeMap["action"];
      option.action();
    }else if (i.type === "date" || i.type === "clock" || i.type === "numbers"){
      option = i.option as biosOptionTypeMap["numbers"];

      if(i.type === "clock"){
        if(this.selected_in_numbers_option !== null) this.start_clock();
        else this.stop_clock();
      }else if(i.type === "date"){
          ConfigurationComponent.date_is_moved_day = false;
      }


      this.select_numbers_option(option);
    }
  }

  protected select_numbers_option(option: biosOptionTypeMap["numbers"]): void {
    if (this.selected_in_numbers_option !== null) this.selected_in_numbers_option = null;
    else {
      this.selected_in_numbers_option = 0;
      this.numbers_option_cache = CopyArray(option.numbers);
    }
  }

  protected on_esc(): void {
    if(this.selected_menu_option_cache !== null){
      (this.options[this.selected_screen_option].options[this.selected_option].option as
        biosOptionTypeMap["options"]).selectedOption = this.selected_menu_option_cache;
      this.selected_menu_option_cache = null;
      return;
    }

    let i: biosOptionFunctionReturn<ValueOf<biosOptionTypeMap>> =
      this.options[this.selected_screen_option].options[this.selected_option];

    if(this.numbers_option_cache !== null){
      if(i.type === "clock"){
        if(this.selected_in_numbers_option !== null) this.start_clock();
        else this.stop_clock();
      }

      if(i.type === "date"){
        ConfigurationComponent.date_is_moved_day = false;
      }

      (this.options[this.selected_screen_option].options[this.selected_option].option as biosOptionTypeMap["numbers"]).numbers = this.numbers_option_cache || [];
      this.numbers_option_cache = null;
      this.selected_in_numbers_option = null
    }
  }

  protected reset_selected_option(): void {
    this.selected_option = -1;
    this.selected_in_numbers_option = null;
    this.check_next_option();
  }

  protected check_next_option(): void {
    for(let i = this.selected_option; i < this.options[this.selected_screen_option].options.length ; i++){
      if(this.options[this.selected_screen_option].options?.[i + 1]?.type !== "information"){
        this.selected_option = i + 1;
        break;
      }
    }
  }

  protected check_previous_option(): void {
    for(let i = this.selected_option; i > 0; i--){
      if(this.options[this.selected_screen_option].options?.[i - 1]?.type !== "information"){
        this.selected_option = i - 1;
        break;
      }
    }
  }

  protected move_right_option(): void {
    if(this.selected_menu_option_cache == null){
      if(this.selected_in_numbers_option !== null){
        ConfigurationComponent.date_is_moved_day = false;
        let i: BiosOptionElementTypeNumbers = this.options[this.selected_screen_option].options[this.selected_option].option as biosOptionTypeMap["numbers"];
        if(this.selected_in_numbers_option + 1 < i.numbers.length) this.selected_in_numbers_option++;
        return;
      }

      if(this.selected_screen_option + 1 < this.options.length){
        this.selected_screen_option += 1;
        this.reset_selected_option();
      }
    }
  }

  protected move_left_option(): void {
    if(this.selected_menu_option_cache == null) {
      if (this.selected_in_numbers_option !== null) {
        ConfigurationComponent.date_is_moved_day = false;
        if (this.selected_in_numbers_option > 0) this.selected_in_numbers_option--;
        return;
      }

      if (this.selected_screen_option > 0) {
        this.selected_screen_option -= 1;
        this.reset_selected_option();
      }
    }
  }

  protected move_up_option(): void {
    if(this.selected_menu_option_cache == null) {
      if (this.selected_in_numbers_option !== null) {
        let i: biosOptionFunctionReturn<ValueOf<biosOptionTypeMap>> =
          this.options[this.selected_screen_option].options[this.selected_option];
        let numbers: BiosOptionElementTypeNumbers = i.option as biosOptionTypeMap["numbers"];
        let number = numbers.numbers[this.selected_in_numbers_option];
        if (number.value < number.max) numbers.numbers[this.selected_in_numbers_option].value++;
        else number.value = number.min;

        if (i.type === "date") this.update_max_days_in_month();
        return;
      }

      if (this.selected_option > 0) this.check_previous_option();
    } else {
      let i = this.options[this.selected_screen_option].options[this.selected_option].option as biosOptionTypeMap["options"];
      if(i.selectedOption  > 0) i.selectedOption--
    }
  }

  protected move_down_option(): void {
    if(this.selected_menu_option_cache == null) {
      if (this.selected_in_numbers_option !== null) {
        let i: biosOptionFunctionReturn<ValueOf<biosOptionTypeMap>> =
          this.options[this.selected_screen_option].options[this.selected_option];
        let numbers: BiosOptionElementTypeNumbers = i.option as biosOptionTypeMap["numbers"];
        let number = numbers.numbers[this.selected_in_numbers_option];
        if (number.value > number.min) numbers.numbers[this.selected_in_numbers_option].value--;
        else number.value = number.max;

        if (i.type === "date") this.update_max_days_in_month();
        return;
      }
      if (this.selected_option + 1 < this.options[this.selected_screen_option].options.length) this.check_next_option();
    } else {
      let i = this.options[this.selected_screen_option].options[this.selected_option].option as biosOptionTypeMap["options"];
      if(i.selectedOption + 1 <  i.options.length) i.selectedOption++
    }
  }

  protected get_drv_with_os_name(): string[] {
    let d: string[] = [];
    for (const drv of Bios.get_drv()) {
      let i: string | null = null;
      let grub = Bios.get_bootable_file(drv);
      if (grub) i = grub.get_kernel().get_system_name();
      d.push(i ? `${drv.name} (${i})` : drv.name);
    }
    return d;
  }

  get get_options(): BiosConfigurationOptionsInterface[] {
    return this.options;
  }

  get get_selected_option_index(): number{
    return this.selected_screen_option;
  }

  get get_bios_version(): string {
    return Bios.get_bios_full_version();
  }

}
