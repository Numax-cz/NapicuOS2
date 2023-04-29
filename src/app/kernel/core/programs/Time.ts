import {Process} from "@Napicu/System/Kernel/core/Process";


export class Time extends Process {

  protected override process_name: string = "Time";

  protected override run_on_run_kernel = true;

  protected override main(): void {

  }

  protected override on_kill = (): void => {
    //TODO Save Time asi?
  }

}
