import * as NapicuKernel from "@Napicu/System/Kernel";
import {GrubBootFileInterface} from "./interface/BootFile";

class Grub{

  protected selected_system: number = -1; //TODO

  protected available_systems: NapicuKernel.Kernel[] = [];


  constructor(available_systems: NapicuKernel.Kernel[]) {
    this.available_systems = available_systems;
  }


  public init(): void {


  }

  public init_kernel(): void {
    this.get_kernel().init();
  }

  public get_kernel(): NapicuKernel.Kernel{
    return this.available_systems[this.selected_system];
  }

  public get_available_kernels(): NapicuKernel.Kernel[]{
    return this.available_systems;
  }

  public show_grub_menu(): void {

  }









}


export {
  Grub,
  GrubBootFileInterface

}

