import * as NapicuUtils from "@Napicu/Utils";
import * as NapicuConfig from "@Napicu/Config"
import * as NapicuComputer from "@Napicu/VirtualComputer"
import * as NapicuGrub from "@Napicu/Grub";

import {InformationInterface} from "./interface/NapicuBiosInformations";
import {BiosPostExceptionCodes} from "./enums/BiosException";
import {TextScreenComponent} from "./components/text-screen/text-screen.component";
import {VirtualComputer} from "@Napicu/VirtualComputer";
import {SpeedControl} from "./scripts/SpeedControl";

class Bios  {
  protected static declare biosConfiguration: InformationInterface;

  public static init(){
    this.load_bios_config();
  }

  public static start_boot(): void {
      this.redirect_text_screen();
      this.post();
  }

  protected static async post(): Promise<void> {
    //TODO Check Hardware
    //TODO Check available bootable drive
    //TODO Start Booting

    return new Promise<void>(async () => {

      //await this.check_hardware();

      await this.get_bootable_file().then((bootable_file: NapicuComputer.Hardware.DriveBaseFileStructureInterface<NapicuGrub.GrubBootFileInterface>) => {
        //TODO StartGrub
      }, (reason) => {
        switch (reason as BiosPostExceptionCodes) {
          case BiosPostExceptionCodes.no_bootable_device:
            TextScreenComponent.print_lines([
              'Please reboot and select proper Boot device.',
              '',
              'Press F1 to reboot device.',
            ]);

            TextScreenComponent.add_event("keydown", (e: KeyboardEvent) => {
              if(e.keyCode == 112) {
                this.clear_text_screen();
                setTimeout(() => {VirtualComputer.reboot()}, SpeedControl.calculate_hardware_speed(NapicuConfig.Bios.BOOT_ERROR_REBOOT_TIME));
                e.preventDefault();
              }
            });

            TextScreenComponent.add_cursor_to_end();
            break;
        }
      });
    });
  }



  protected static check_hardware(): Promise<any> {
    return new Promise<any>((resolve, reject)  => {

    })
  }

  protected static get_bootable_file(): Promise<NapicuComputer.Hardware.DriveBaseFileStructureInterface<NapicuGrub.GrubBootFileInterface>> { //TODO Promise
    return new Promise<NapicuComputer.Hardware.DriveBaseFileStructureInterface<NapicuGrub.GrubBootFileInterface>>((resolve, reject) => {
      const ckb: NapicuComputer.Hardware.DriveBaseFilesAndFoldersStructureInterface | undefined =
        this.get_selected_drv().data.partitions?.["sda"]?.folders.data?.["boot"];
      if(!ckb || !ckb.files["grub"]?.data) reject(BiosPostExceptionCodes.no_bootable_device);
      else resolve(ckb.files["grub"]);
    })
  }

  protected static load_bios_config(): void {
    this.biosConfiguration = this.get_bios_configuration();
  }

  protected static no_bootable_device_error(): void {
    NapicuUtils.WebManager.navigate_angular_router(NapicuConfig.Path.BIOS_TEXT_SCREEN_PATH);
  }

  public static enter_bios_configuration(): void {
    NapicuUtils.WebManager.navigate_angular_router(NapicuConfig.Path.BIOS_CONFIGURATION_ROOT_PATH, NapicuConfig.Bios.ENTER_BIOS_TIME_DELAY);
  }

  public static exit_bios_configuration_with_save(): void {

  }

  public static exit_bios_configuration_without_save(): void {

  }

  public static load_default_bios_configuration(): void {

  }

  public static redirect_text_screen(): void {
    if(NapicuUtils.WebManager.get_angular_router_path() !== NapicuConfig.Path.BIOS_TEXT_SCREEN_PATH){
      NapicuUtils.WebManager.navigate_angular_router(NapicuConfig.Path.BIOS_TEXT_SCREEN_PATH);
    }
  }

  public static clear_text_screen(): void {
    TextScreenComponent.clear();
  }



  public static get_bios_configuration(): InformationInterface{
    if (!this.biosConfiguration){
      this.biosConfiguration = NapicuUtils.Cookies.getCookies
        <InformationInterface>(NapicuConfig.Web.BIOS_COOKIES_NAME) || NapicuConfig.Bios.DEFAULT_CONFIGURATION;
    }
    return this.biosConfiguration;
  }

  public static get_cpu(): NapicuComputer.Hardware.HardwareCPUInformationInterface {
    return NapicuComputer.VirtualComputer.get_hardware().cpu;
  }

  public static get_ram(): NapicuComputer.Hardware.HardwareRAMInformationInterface[] {
    return NapicuComputer.VirtualComputer.get_hardware().ram;
  }

  public static get_gpu(): NapicuComputer.Hardware.HardwareGPUInformationInterface {
    return NapicuComputer.VirtualComputer.get_hardware().gpu;
  }

  public static get_drv(): NapicuComputer.Hardware.HardwareDRVInformationInterface[] {
    return NapicuComputer.VirtualComputer.get_hardware().drv;
  }

  public static get_selected_drv(): NapicuComputer.Hardware.HardwareDRVInformationInterface {
    return NapicuComputer.VirtualComputer.get_hardware().drv[this.biosConfiguration.selected_drive];
  }

  public static get_bios_full_version(): string {
    return `${this.get_bios_version()} ${this.get_bios_version_company_name()} ${this.get_bios_version_date()}`;
  }

  public static get_bios_version(): string {
    return NapicuConfig.Bios.BIOS_VERSION;
  }

  public static get_bios_version_company_name(): string {
    return NapicuConfig.Bios.BIOS_VERSION_COMPANY_NAME;
  }

  public static get_bios_version_date(): string {
    return NapicuConfig.Bios.BIOS_VERSION_DATE;
  }
}

export {
  Bios,
  InformationInterface,
  SpeedControl
}

