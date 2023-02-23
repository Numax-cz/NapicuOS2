import {Process} from "@Napicu/System/Kernel/core/Process";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";


export class Time extends Process {

  protected process_name: string = "Test";

  constructor() {
    super();
    this.run_on_run_kernel = true;
  }

  protected main(kernel: Kernel): void {
    console.log(kernel.time);
  }

  protected on_kill = (): void => {

  }




}
