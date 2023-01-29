import {InformationInterface} from "../../bios/interface/NapicuBiosInformations";

export namespace BiosConfig{
  export const PRODUCTION_CONFIGURATION: boolean = false;

  //KEYS
  export const ENTER_BIOS_KEY_1: number = 46; //DEL
  export const EXIT_BOOT_ERROR_KEY: number = 113; //F2
  export const ENTER_BIOS_KEY_2: number = 113; //F2

  export const BIOS_CONFIGURATION_MOVE_RIGHT: number = 39; //ArrowRight
  export const BIOS_CONFIGURATION_MOVE_LEFT: number = 37; //ArrowLeft
  export const BIOS_CONFIGURATION_MOVE_UP: number = 38; //ArrowRight
  export const BIOS_CONFIGURATION_MOVE_DOWN: number = 40; //ArrowLeft
  export const BIOS_CONFIGURATION_ON_ENTER: number = 13; //Enter
  export const BIOS_CONFIGURATION_ON_ESC: number = 27; //ESC

  //TIMES
  export const ENTER_BIOS_TIME_DELAY: number = 0;
  export const EXIT_BIOS_SPLASH_SCREEN_DELAY: number = 2000;

  export const BOOT_ERROR_REBOOT_TIME: number = 1500;

  export const ENTER_GRUB_MENU: number = 2000;


  //CONFIGURATOR

  export const BIOS_VERSION: string = "v3.69_DEVELOPMENT";
  export const BIOS_VERSION_COMPANY_NAME: string = "Napicu";
  export const BIOS_VERSION_DATE: string = "1969 - 2023";

  export const DEFAULT_CONFIGURATION: InformationInterface = {
    selected_drive: 0,
    time: [0, 0, 0],
    date: [1, 1, 2023]
  }

}

