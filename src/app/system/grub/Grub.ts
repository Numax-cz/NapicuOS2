import * as NapicuKernel from "@Napicu/System/Kernel";
import * as NapicuUtils from "@Napicu/Utils";
import * as NapicuConfig from "@Napicu/Config";
import {GrubBootFileInterface} from "./interface/BootFile";
import {TextScreenComponent} from "../../bios/components/text-screen/text-screen.component";

class Grub{

  protected selected_system: number = -1; //TODO

  protected available_systems: NapicuKernel.Kernel[] = [];


  constructor(available_systems: NapicuKernel.Kernel[]) {
    this.available_systems = available_systems;
  }


  public init(): void {

    if(this.available_systems.length === 0){
      TextScreenComponent.print_lines([
        'No system available',
      ]);
      return;
    } else if (this.available_systems.length > 1){
      this.show_grub_menu();
      return;
    }

    this.init_kernel();
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

