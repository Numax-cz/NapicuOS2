import * as NapicuComputer from "@Napicu/VirtualComputer";
import * as NapicuUtils from "@Napicu/Utils";
import * as NapicuConfig from "@Napicu/Config"
import * as NapicuHardware from "@Napicu/VirtualComputer"
import {InformationInterface} from "./interface/NapicuBiosInformations";

class Bios  {
  protected static declare hardwareInformations: NapicuHardware.HardwareInformationInterface;
  protected static declare biosConfiguration: InformationInterface;


  public static init(){
    this.load_bios_config();

    this.post();

  }

  protected static post(): void {
    //TODO Check Hardware
    //TODO Check available bootable drive
    //TODO Start Booting
    //this.get_selected_drv().data.partitions["sda"]
  }

  protected static load_bios_config(): void {
    this.biosConfiguration = this.get_bios_configuration();
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

  public static get_cpu(): NapicuHardware.HardwareCPUInformationInterface {
    return this.hardwareInformations.cpu;
  }

  public static get_ram(): NapicuHardware.HardwareRAMInformationInterface[] {
    return this.hardwareInformations.ram;
  }

  public static get_gpu(): NapicuHardware.HardwareGPUInformationInterface {
    return this.hardwareInformations.gpu;
  }

  public static get_drv(): NapicuHardware.HardwareDRVInformationInterface[] {
    return this.hardwareInformations.drv;
  }

  public static get_selected_drv(): NapicuHardware.HardwareDRVInformationInterface {
    return this.hardwareInformations.drv[this.biosConfiguration.selected_drive];
  }
}

export {
  Bios,
  InformationInterface
}

