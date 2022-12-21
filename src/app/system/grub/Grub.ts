import * as NapicuKernel from "@Napicu/System/Kernel";
import {GrubBootFileInterface} from "./interface/BootFile";

class Grub{

  protected available_systems: NapicuKernel.Kernel[] = [];


  constructor(available_systems: NapicuKernel.Kernel[]) {
    this.available_systems = available_systems;
  }


  public init(): void {

  }

  private show_grub_menu(): void {

  }







}


export {
  Grub,
  GrubBootFileInterface

}

