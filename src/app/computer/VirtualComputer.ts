import {Bios} from "../bios/Bios";
import {
  HardwareCPUInformationInterface,
  HardwareDRVInformationInterface,
  HardwareGPUInformationInterface,
  HardwareInformationInterface,
  HardwareRAMInformationInterface
} from "./interface/NapicuHardware";
import {Computer} from "../config/hardware/ComputerHardware";


export class VirtualComputer {
  protected static readonly hardware: HardwareInformationInterface = Computer.HARDWARE;

  protected static isRunning: boolean = false;

  public static start(): void {
    Bios.init(); //TODO Promise
    this.isRunning = true;
  }

  public static reboot(): void {
    window.location.reload(); //TODO delay
  }


  public static enter_bios_configuration(): void {
    Bios.enter_bios_configuration()
  }

  public static get_is_running(): boolean{
    return this.isRunning;
  }

  public static get_hardware(): HardwareInformationInterface{
    return this.hardware;
  }

  protected static get_cpu(): HardwareCPUInformationInterface {
    return this.hardware.cpu;
  }

  protected static get_ram(): HardwareRAMInformationInterface[] {
    return this.hardware.ram;
  }

  protected static get_gpu(): HardwareGPUInformationInterface {
    return this.hardware.gpu;
  }

  protected static get_drv(): HardwareDRVInformationInterface[] {
    return this.hardware.drv;
  }
}
