import * as NapicuConfig from "@Napicu/Config";
import * as NapicuBios from "@Napicu/Bios";
import * as NapicuComputer from "@Napicu/VirtualComputer";

export class VirtualComputer {
  protected static readonly hardware: NapicuComputer.Hardware.HardwareInformationInterface = NapicuConfig.VirtualComputer.HARDWARE;


  public static start(): void {
    NapicuBios.Bios.init();
  }

  public static enter_bios_configuration(): void {
    NapicuBios.Bios.enter_bios_configuration()
  }

  public static get_hardware(): NapicuComputer.Hardware.HardwareInformationInterface{
    return this.hardware;
  }

  protected static get_cpu(): NapicuComputer.Hardware.HardwareCPUInformationInterface {
    return this.hardware.cpu;
  }

  protected static get_ram(): NapicuComputer.Hardware.HardwareRAMInformationInterface[] {
    return this.hardware.ram;
  }

  protected static get_gpu(): NapicuComputer.Hardware.HardwareGPUInformationInterface {
    return this.hardware.gpu;
  }

  protected static get_drv(): NapicuComputer.Hardware.HardwareDRVInformationInterface[] {
    return this.hardware.drv;
  }
}
