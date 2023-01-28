import * as NapicuKernel from "@Napicu/System/Kernel";
import * as NapicuUtils from "@Napicu/Utils";
import * as NapicuConfig from "@Napicu/Config";
import {GrubBootFileInterface} from "./interface/BootFile";

class Grub{

  protected selected_system: number = -1; //TODO

  protected available_systems: NapicuKernel.Kernel[] = [];


  constructor(available_systems: NapicuKernel.Kernel[]) {
    this.available_systems = available_systems;
  }


  public init(): void {
    this.show_grub_menu();

    if(this.available_systems.length === 0){

    } else if (this.available_systems.length > 1){

    }



  }

  protected init_kernel(): void {
    this.get_kernel().init();
  }

  protected show_grub_menu(): void {
    NapicuUtils.WebManager.navigate_angular_router(NapicuConfig.Path.GRUB_MENU_PATH);
  }

  public get_kernel(): NapicuKernel.Kernel{
    return this.available_systems[this.selected_system];
  }

  public get_available_kernels(): NapicuKernel.Kernel[]{
    return this.available_systems;
  }
}


export {
  Grub,
  GrubBootFileInterface

}

