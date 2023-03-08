import {Kernel} from "../NapicuKernel";
import {WebManager} from "../../utils/WebManager";
import {PathConfig} from "../../config/web/PathConfig";
import {BootLoader} from "@Napicu/Bios/Boot";
import {Bios} from "@Napicu/Bios/Bios";
import {
  DrivePartitionsStructureDataInterface,
  HardwareDRVInformationInterface
} from "@Napicu/VirtualComputer/interface/NapicuHardware";
import {ALPHABET} from "@Napicu/Utils/interface/Alphabet";
import {Console} from "@Napicu/Utils/Console";

export class Grub extends BootLoader{

  protected selected_system: number = 0; //TODO -1

  protected available_systems: Kernel[] = [];


  constructor(available_systems: Kernel[]) {
    super();
    this.available_systems = available_systems;
  }

  public override init(): void {
    this.init_drives();

    // if(this.available_systems.length === 0){
    //   TextScreenComponent.print_lines([
    //     'No system available',
    //   ]);
    //   return;
    // } else if (this.available_systems.length > 1){
    //   this.show_grub_menu();
    //   return;
    // }



    this.init_kernel();
  }

  protected init_kernel(): void {
    this.get_kernel()?.init();
  }

  protected init_drives(): void {
    Bios.get_drv().forEach((drive: HardwareDRVInformationInterface, drive_index: number) => {
      if(drive_index > ALPHABET.length - 1) Console.print_error("To many drives");
      else{
        let sys_name = "sb" + ALPHABET[drive_index].toLowerCase();
        drive.sys_name = sys_name;
        drive.partitions.forEach((partition: DrivePartitionsStructureDataInterface, partition_index: number) => {
          partition.name = sys_name + (partition_index + 1);
        });
      }
    });
  }

  protected show_grub_menu(): void {
    WebManager.navigate_angular_router(PathConfig.GRUB_MENU_PATH);
  }

  public get_kernel(): Kernel{
    return this.available_systems[this.selected_system];
  }

  public get_available_kernels(): Kernel[]{
    return this.available_systems;
  }
}


