import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";

export abstract class Command {

  protected abstract on_run(kernel: Kernel): void;


  public run(kernel: Kernel): void {
    this.on_run(kernel);
  }
}
