declare namespace NapicuHardware {

  export interface HardwareCPUInformationInterface{
    name: string;
    speed: number;
    tdp: number;
  }

  export interface HardwareDRVInformationInterface{
    name: string;
    speed: number;
    capacity: number;
  }

  export interface HardwareGPUInformationInterface{
    name: string;
    speed: number;
  }

  export interface HardwareRAMInformationInterface{
    name: string;
    speed: number;
    capacity: number;
  }


  export interface HardwareInformationInterface{
    cpu: HardwareCPUInformationInterface;
    ram: HardwareRAMInformationInterface[];
    gpu: HardwareGPUInformationInterface;
    drv: HardwareDRVInformationInterface[];
  }
}
