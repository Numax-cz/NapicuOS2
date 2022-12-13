import {Process} from "@Napicu/System/kernel/core/Process";


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
  Process
}

