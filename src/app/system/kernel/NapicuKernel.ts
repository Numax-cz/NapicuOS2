import * as NapicuUtils from "@Napicu/Utils";
import { Process } from "./core/Process";
import {SystemDataDriveInterface} from "./interface/Kernel";
import {SystemFileStructure} from "./interface/Drive";

abstract class Kernel{
  protected readonly abstract system_name: string;

  protected running_process: Process[] = [];


  protected abstract main(): void;



  public init(): void {
    //NapicuUtils.WebManager.navigate_angular_router("system");
    this.main();
  }





  public get_system_name(): string{
    return this.system_name;
  }

  public creat_new_partition(name: string): void { //TODO NoVoid

  }

  public get_partition(name: string): void { //TODO NoVoid

  }
}

export {
  Kernel,
  Process,
  SystemDataDriveInterface,
  SystemFileStructure

}

