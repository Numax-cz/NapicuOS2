import * as NapicuComputer from "@Napicu/VirtualComputer";
import * as NapicuGrub from "@Napicu/Grub";
import {Kernel} from "@Napicu/System/Kernel";



const disk_1: NapicuComputer.Hardware.HardwareDRVInformationInterface = {
  name: "Samsung SSD 860 EVO 500GB",
  capacity: 500,
  speed: 500,

  data: {
    partitions: {
      sda: {
        files: {},

        folders: {
          data: {
            //BootFIle
            boot: {
              files: {
                grub: {data: new NapicuGrub.Grub([])}
              },
              folders: {}
            }

          }
        }
      }
    }
  }
}

const disk_2: NapicuComputer.Hardware.HardwareDRVInformationInterface = {
  name: "Seagate BarraCuda 2.5 500GB",
  capacity: 500,
  speed: 10,

  data: {
    partitions: {}
  }
}

const disk_3: NapicuComputer.Hardware.HardwareDRVInformationInterface = {
  name: "IBM 3330",
  capacity: 0.100,
  speed: 10,

  data: {
    partitions: {}
  }
}

export namespace Computer{
  export const HARDWARE: NapicuComputer.Hardware.HardwareInformationInterface = {
    cpu: {
      name: "CPU",
      tdp: 0,
      speed: 3000
    },
    drv: [disk_1, disk_2, disk_3],
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

