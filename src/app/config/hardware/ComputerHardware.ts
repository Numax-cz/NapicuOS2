import {TestSystem} from "../../system/TestSystem/system";
import {Grub} from "@Napicu/Grub/Grub";
import {HardwareDRVInformationInterface, HardwareInformationInterface} from "../../computer/interface/NapicuHardware";
import {BiosConfig} from "@Napicu/Config/bios/Bios";


const disk_1: HardwareDRVInformationInterface = {
  name: "Samsung SSD 860 EVO 500GB",
  capacity: 500,
  speed: 500,


  partitions: [
    {
      flag: "Boot",
      data: {
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
    },
    {
      flag: "System Volume",
      data: {
        files: {},
        folders: {}
      }
    }
  ]

}

// const disk_2: HardwareDRVInformationInterface = {
//   name: "Seagate BarraCuda 2.5 500GB",
//   capacity: 500,
//   speed: 10,
//   partitions: []
// }

const disk_3: HardwareDRVInformationInterface = {
  name: "IBM 3330",
  capacity: 0.100,
  speed: 10,
  partitions: []
}

const disk_4: HardwareDRVInformationInterface = {
  name: "USB-BIOS",
  capacity: 1,
  speed: 200,
  partitions: [
    {
      flag: "System Volume",
      data: {
        files: {
          "P8H66-CFT3": {data: BiosConfig.BIOS_NEW_ROM_FILE}
        },
        folders: {}
      }
    }
  ]
}

export namespace Computer{
  export const HARDWARE: HardwareInformationInterface = {
    cpu: {
      name: "AMD Celeron (tm) II B45 Processor @ 3.0 GHz (64bit)",
      tdp: 0,
      speed: 3000,
      cache: 8192
    },
    drv: [disk_1, disk_3, disk_4],
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

