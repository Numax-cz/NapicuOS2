import { Process } from "./core/Process";
import {SystemDataDriveInterface} from "./interface/Kernel";
import {SystemFileStructure} from "./interface/Drive";

abstract class Kernel{
  protected readonly abstract system_name: string;

  protected running_process: Process[] = [];


  protected abstract main(): void;



  public init(): void {

    //Init NapicuKernel
  }





  public get_system_name(): string{
    return this.system_name;
  }
}

export {
  Kernel,
  Process,
  SystemDataDriveInterface,
  SystemFileStructure

}

