import {Process} from "@Napicu/System/Kernel/core/Process";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";


export class Time extends Process {

  protected override process_name: string = "Time";

  constructor() {
    super();
    this.run_on_run_kernel = true;
  }

  protected override main(kernel: Kernel): void {

  }

  protected override on_kill = (): void => {
    //TODO Save Time asi?
  }

}
