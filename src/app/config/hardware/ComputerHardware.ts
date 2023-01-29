import {TestSystem} from "../../system/TestSystem/system";
import {Grub} from "@Napicu/Grub/Grub";
import {HardwareDRVInformationInterface, HardwareInformationInterface} from "../../computer/interface/NapicuHardware";


const disk_1: HardwareDRVInformationInterface = {
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
                grub: {data: new Grub([new TestSystem()])}
              },
              folders: {}
            }

          }
        }
      }
    }
  }
}

const disk_2: HardwareDRVInformationInterface = {
  name: "Seagate BarraCuda 2.5 500GB",
  capacity: 500,
  speed: 10,

  data: {
    partitions: {}
  }
}

const disk_3: HardwareDRVInformationInterface = {
  name: "IBM 3330",
  capacity: 0.100,
  speed: 10,

  data: {
    partitions: {}
  }
}

export namespace Computer{
  export const HARDWARE: HardwareInformationInterface = {
    cpu: {
      name: "AMD Celeron (tm) II B45 Processor @ 3.0 GHz (64bit)",
      tdp: 0,
      speed: 3000,
      cache: 8192
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
    },
    serial_number: "PICO32KJA490KD23J13FD41J6"
  };
}

