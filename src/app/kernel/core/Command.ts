import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";

export abstract class Command {

  protected abstract main(kernel: Kernel, args: string[]): void;


  public run(kernel: Kernel, args: string[]): void {
    this.main(kernel, args);
  }
}
