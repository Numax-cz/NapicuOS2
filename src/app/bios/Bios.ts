import * as NapicuUtils from "@Napicu/Utils";
import * as NapicuConfig from "@Napicu/Config"
import * as NapicuComputer from "@Napicu/VirtualComputer"
import {InformationInterface} from "./interface/NapicuBiosInformations";
import {BiosPostExceptionCodes} from "./enums/BiosException";

class Bios  {
  protected static declare hardwareInformations: NapicuComputer.Hardware.HardwareInformationInterface;
  protected static declare biosConfiguration: InformationInterface;


  public static init(){
    this.load_bios_config();

    this.post();

  }

  protected static async post(): Promise<void> {
    //TODO Check Hardware
    //TODO Check available bootable drive
    //TODO Start Booting
    return new Promise<void>(async () => {

      await this.check_hardware();

      await this.check_bootable_drive();



    });





  }

  protected static check_hardware(): Promise<any> {
    return new Promise<any>((resolve, reject) => {

    })
  }

  protected static check_bootable_drive(): Promise<BiosPostExceptionCodes> { //TODO Promise
    return new Promise<BiosPostExceptionCodes>((resolve, reject) => {
      const ckb: NapicuComputer.Hardware.DriveBaseFilesAndFoldersStructureInterface | undefined =
        this.get_selected_drv().data.partitions?.["sda"]?.data["boot"];
      if(!ckb) reject(BiosPostExceptionCodes.no_bootable_device);
      else {
        //TODO Load NapicuGrub

      }
    })
  }

  protected static load_bios_config(): void {
    this.biosConfiguration = this.get_bios_configuration();
  }

  protected static no_bootable_device_error(): void {

  }


  public static enter_bios_configuration(): void {
    NapicuUtils.WebManager.navigate_angular_router(NapicuConfig.Path.BIOS_CONFIGURATION_ROOT_PATH, NapicuConfig.Bios.ENTER_BIOS_TIME_DELAY);
  }

  public static get_bios_configuration(): InformationInterface{
    if (!this.biosConfiguration){
      this.biosConfiguration = NapicuUtils.Cookies.getCookies
        <InformationInterface>(NapicuConfig.Web.BIOS_COOKIES_NAME) || NapicuConfig.Bios.DEFAULT_CONFIGURATION;
    }
    return this.biosConfiguration;
  }

  public static get_cpu(): NapicuComputer.Hardware.HardwareCPUInformationInterface {
    return this.hardwareInformations.cpu;
  }

  public static get_ram(): NapicuComputer.Hardware.HardwareRAMInformationInterface[] {
    return this.hardwareInformations.ram;
  }

  public static get_gpu(): NapicuComputer.Hardware.HardwareGPUInformationInterface {
    return this.hardwareInformations.gpu;
  }

  public static get_drv(): NapicuComputer.Hardware.HardwareDRVInformationInterface[] {
    return this.hardwareInformations.drv;
  }

  public static get_selected_drv(): NapicuComputer.Hardware.HardwareDRVInformationInterface {
    return this.hardwareInformations.drv[this.biosConfiguration.selected_drive];
  }
}

export {
  Bios,
  InformationInterface
}

