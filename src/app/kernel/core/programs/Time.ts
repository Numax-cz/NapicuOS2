import {Process} from "@Napicu/System/Kernel/core/Process";


export class Time extends Process {

  protected process_name: string = "Test";

  constructor() {
    super();
    this.run_on_run_kernel = true;
  }

  protected main(): void {
    console.log("xd");

  }

  protected on_kill = (): void => {

  }




}
