import {InformationInterface} from "../../bios/interface/NapicuBiosInformations";
import {BiosRomVersion, FlashFile} from "@Napicu/Bios/components/configuration/interface/FlashFile";
import {ArrayOfMaxLength3Readonly} from "@Napicu/Utils/Utils";

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
  export const BIOS_CONFIGURATION_ON_TAB: number = 9; //TAB
  export const BIOS_CONFIGURATION_ON_HOME: number = 36; //HOME
  export const BIOS_CONFIGURATION_ON_END: number = 35; //END

  //TIMES
  export const ENTER_BIOS_TIME_DELAY: number = 0;
  export const EXIT_BIOS_SPLASH_SCREEN_DELAY: number = 2000;

  export const BOOT_ERROR_REBOOT_TIME: number = 1500;

  export const ENTER_GRUB_MENU: number = 2000;

  export const ENTER_FLASH_MENU_TIME: number = 1500;

  export const EXIT_FLASH_MENU_TIME: number = 1000;

  export const EXIT_FLASH_REBOOT_TIME: number = 1400;


  //CONFIGURATOR
  export const BIOS_NEW_ROM_FILE: FlashFile = {
    rom_information: {
      board: "P8H66-CFT3",
      date: "01/24/2023",
      version: "1906 h:420"
    }
  }

  export const BIOS_ROM: BiosRomVersion = {
    board: "P8H66-CFT3",
    date: "07/24/2022",
    version: "1606 h:320"
  }

  export const BIOS_VERSION: string = "v3.69_DEVELOPMENT";
  export const BIOS_VERSION_COMPANY_NAME: string = "Napicu";
  export const BIOS_VERSION_DATE: string = "1969 - 2023";

  export const DEFAULT_TIME_CONFIGURATION: ArrayOfMaxLength3Readonly<number> = [0, 0, 0];
  export const DEFAULT_DATE_CONFIGURATION: ArrayOfMaxLength3Readonly<number> = [1, 1, 2023];

  export const DEFAULT_CONFIGURATION: InformationInterface = {
    rom: BIOS_ROM,
    selected_drive: 0,
    time: DEFAULT_TIME_CONFIGURATION,
    date: DEFAULT_DATE_CONFIGURATION,

    network_boot: 0,
    wake_on_lan: 0,
    amd_iommu: 0,
    amd_svm: 0,
    boot_mode: 0,
    fast_boot: 0,
    secure_boot:0
  }

}

