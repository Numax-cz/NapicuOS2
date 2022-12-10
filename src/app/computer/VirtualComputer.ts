/// <reference path="./interface/NapicuHardware.d.ts" />
/// <reference path="../config/hardware/ComputerHardware.ts" />
/// <reference path="../bios/Bios.ts" />

namespace NapicuVirtualComputer{
  export class VirtualComputer {
    protected static readonly hardware: NapicuHardware.HardwareInformationInterface = NapicuConfig.VirtualComputer.HARDWARE;

    public static start(): void {
      NapicuBios.Bios.init();
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
}
