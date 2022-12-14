import * as NapicuHardware from "@Napicu/VirtualComputer";


export namespace VirtualComputer{
  export const HARDWARE: NapicuHardware.HardwareInformationInterface = {
    cpu: {
      name: "CPU",
      tdp: 0,
      speed: 0
    },
    drv: [],
    gpu: {
      name: "GPU",
      speed: 0
    },
    ram: []
  };
}

