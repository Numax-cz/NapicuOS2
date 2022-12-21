import * as NapicuComputer from "@Napicu/VirtualComputer";
import * as NapicuKernel from "@Napicu/System/Kernel";



const disk_1: NapicuComputer.Hardware.HardwareDRVInformationInterface = {
  name: "Samsung SSD 860 EVO 250GB",
  capacity: 250,
  speed: 500,

  data: {
    partitions: {
      sda: {
        files: {

        },

        folders: {
          data: {
            boot: {

              files: {
                grub: {data: null}
              },

              folders: {}
            }
          }
        }


      }
    }
  }
}

export namespace VirtualComputer{
  export const HARDWARE: NapicuComputer.Hardware.HardwareInformationInterface = {
    cpu: {
      name: "CPU",
      tdp: 0,
      speed: 3000
    },
    drv: [disk_1],
    gpu: {
      name: "GPU",
      speed: 1000
    },
    ram: [
      {speed: 2000, capacity: 8, name: "RAM 1"},
      {speed: 2000, capacity: 8, name: "RAM 2"}
    ],
    brd: {
      name: "Board",
      speed: 100
    }
  };
}

