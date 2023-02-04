import {Kernel} from "../NapicuKernel";
import {WebManager} from "../../utils/WebManager";
import {PathConfig} from "../../config/web/PathConfig";
import {BootLoader} from "@Napicu/Bios/Boot";

export class Grub extends BootLoader{

  protected selected_system: number = 0; //TODO -1

  protected available_systems: Kernel[] = [];


  constructor(available_systems: Kernel[]) {
    super();
    this.available_systems = available_systems;
  }

  public override init(): void {
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


