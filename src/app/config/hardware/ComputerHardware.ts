import * as NapicuComputer from "@Napicu/VirtualComputer";
import * as NapicuKernel from "@Napicu/System/Kernel";



const disk_1: NapicuComputer.NapicuHardware.HardwareDRVInformationInterface = {
  name: "Samsung SSD 860 EVO 250GB",
  capacity: 250,
  speed: 500,

  data: {
    partitions: {}
  }


}

export namespace VirtualComputer{
  export const HARDWARE: NapicuComputer.NapicuHardware.HardwareInformationInterface = {
    cpu: {
      name: "CPU",
      tdp: 0,
      speed: 0
    },
    drv: [disk_1],
    gpu: {
      name: "GPU",
      speed: 0
    },
    ram: []
  };
}

