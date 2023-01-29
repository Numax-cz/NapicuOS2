import {InformationInterface} from "../../bios/interface/NapicuBiosInformations";


export namespace BiosConfig{
  export const PRODUCTION_CONFIGURATION: boolean = true;

  export const ENTER_BIOS_KEY_1: number = 46;
  export const ENTER_BIOS_KEY_2: number = 113;

  export const ENTER_BIOS_TIME_DELAY: number = 1500;
  export const EXIT_SPLASH_SCREEN_TIME_DELAY: number = 3500;

  export const BOOT_ERROR_REBOOT_TIME: number = 1500;


  //CONFIGURATOR

  export const BIOS_VERSION: string = "v3.69";
  export const BIOS_VERSION_COMPANY_NAME: string = "Napicu";
  export const BIOS_VERSION_DATE: string = "1969 - 2023";


  export const DEFAULT_CONFIGURATION: InformationInterface = {
    selected_drive: 0,

    time: [0, 0, 0],
    date: [1, 1, 2023]
  }
}

