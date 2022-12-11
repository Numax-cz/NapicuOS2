import * as NapicuComputer from "@Napicu/VirtualComputer";


export class Bios  {
  protected static declare hardwareInformations: NapicuHardware.HardwareInformationInterface;
  protected static declare biosConfiguration: NapicuBios.InformationInterface;


  public static init(){
    //TODO Redirect

    this.biosConfiguration = NapicuComputer.VirtualComputer.get_hardware();

    this.post();
  }

  protected static post(): void {
    //TODO Check Hardware
    //TODO Check available bootable drive
    //TODO Start Booting
  }

  protected static load_bios_config(): void {
    //TODO Read cookies
  }

  public static enter_bios_configuration(): void {

  }


  public static get_bios_config(): NapicuBios.InformationInterface{
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
}



