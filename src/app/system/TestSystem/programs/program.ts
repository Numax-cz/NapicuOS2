import {Process} from "@Napicu/System/Kernel/core/Process";

export class TestProgram extends Process {
  protected process_name: string = "Program";

  protected on_kill = (): void  => {
  }


  protected main(): void {
  }

}
