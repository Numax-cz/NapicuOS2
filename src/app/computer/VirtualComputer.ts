import * as NapicuConfig from "@Napicu/Config";
import * as NapicuBios from "@Napicu/Bios";
import * as NapicuHardware from "@Napicu/VirtualComputer";

export class VirtualComputer {
  protected static readonly hardware: NapicuHardware.HardwareInformationInterface = NapicuConfig.VirtualComputer.HARDWARE;


  public static start(): void {
    NapicuBios.Bios.init();
  }

  public static enter_bios_configuration(): void {
    NapicuBios.Bios.enter_bios_configuration()
  }

  public static get_hardware(): NapicuHardware.HardwareInformationInterface{
    return this.hardware;
  }

  protected static get_cpu(): NapicuHardware.HardwareCPUInformationInterface {
    return this.hardware.cpu;
  }

  protected static get_ram(): NapicuHardware.HardwareRAMInformationInterface[] {
    return this.hardware.ram;
  }

  protected static get_gpu(): NapicuHardware.HardwareGPUInformationInterface {
    return this.hardware.gpu;
  }

  protected static get_drv(): NapicuHardware.HardwareDRVInformationInterface[] {
    return this.hardware.drv;
  }
}
