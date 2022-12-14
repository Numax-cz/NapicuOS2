
import * as NapicuBios from "@Napicu/Bios"

export namespace Bios{
  export const PRODUCTION_CONFIGURATION: boolean = false;

  //KEYS
  export const ENTER_BIOS_KEY_1: number = 46; //DEL
  export const EXIT_BOOT_ERROR_KEY: number = 113; //F2
  export const ENTER_BIOS_KEY_2: number = 113; //F2

  export const BIOS_CONFIGURATION_MOVE_UP: number = 39; //ArrowRight
  export const BIOS_CONFIGURATION_MOVE_DOWN: number = 37; //ArrowLeft

  //TIMES
  export const ENTER_BIOS_TIME_DELAY: number = 0;
  export const EXIT_BIOS_SPLASH_SCREEN_DELAY: number = 2000;

  export const BOOT_ERROR_REBOOT_TIME: number = 1500;


  //CONFIGURATOR

  export const BIOS_VERSION: string = "v3.69_DEVELOPMENT";
  export const BIOS_VERSION_COMPANY_NAME: string = "Napicu";
  export const BIOS_VERSION_DATE: string = "1969 - 2023";

  export const DEFAULT_CONFIGURATION: NapicuBios.InformationInterface = {
    selected_drive: 0
  }

}

