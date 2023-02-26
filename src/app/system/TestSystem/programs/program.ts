import {Process} from "@Napicu/System/Kernel/core/Process";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {Console} from "@Napicu/Utils/Console";

export class TestProgram extends Process {
  protected process_name: string = "Program";

  protected on_kill = (): void  => {
  }


  protected main(kernel: Kernel): void {
    Console.print_information_debug("KERNEL - TestProgram loaded");
  }

}
