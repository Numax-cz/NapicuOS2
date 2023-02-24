import {Process} from "@Napicu/System/Kernel/core/Process";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {Console} from "@Napicu/Utils/Console";


export class Time extends Process {

  protected override process_name: string = "Time";

  constructor() {
    super();
    this.run_on_run_kernel = true;
  }

  protected override main(kernel: Kernel): void {
    console.log(kernel.time);
    Console.print_information_debug("KERNEL - Time loaded");
  }

  protected override on_kill = (): void => {
    //TODO Save Time asi?
  }

}
