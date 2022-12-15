import * as NapicuConfig from "@Napicu/Config";
import * as NapicuBios from "@Napicu/Bios";
import * as NapicuComputer from "@Napicu/VirtualComputer";

export class VirtualComputer {
  protected static readonly hardware: NapicuComputer.NapicuHardware.HardwareInformationInterface = NapicuConfig.VirtualComputer.HARDWARE;


  public static start(): void {
    NapicuBios.Bios.init();
  }

  public static enter_bios_configuration(): void {
    NapicuBios.Bios.enter_bios_configuration()
  }

  public static get_hardware(): NapicuComputer.NapicuHardware.HardwareInformationInterface{
    return this.hardware;
  }

  protected static get_cpu(): NapicuComputer.NapicuHardware.HardwareCPUInformationInterface {
    return this.hardware.cpu;
  }

  protected static get_ram(): NapicuComputer.NapicuHardware.HardwareRAMInformationInterface[] {
    return this.hardware.ram;
  }

  protected static get_gpu(): NapicuComputer.NapicuHardware.HardwareGPUInformationInterface {
    return this.hardware.gpu;
  }

  protected static get_drv(): NapicuComputer.NapicuHardware.HardwareDRVInformationInterface[] {
    return this.hardware.drv;
  }
}
