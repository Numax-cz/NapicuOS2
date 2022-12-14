
import * as NapicuBios from "@Napicu/Bios"

export namespace Bios{
  export const PRODUCTION_CONFIGURATION: boolean = false;

  export const ENTER_BIOS_KEY_1: number = 46;
  export const ENTER_BIOS_KEY_2: number = 113;

  export const ENTER_BIOS_TIME_DELAY: number = 0;
  export const EXIT_SPLASH_SCREEN_TIME_DELAY: number = 3500;


  export const DEFAULT_CONFIGURATION: NapicuBios.InformationInterface = {
    selected_drive: 0
  }
}

