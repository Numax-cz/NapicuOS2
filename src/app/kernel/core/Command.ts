import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";

export abstract class Command {

  protected abstract main(kernel: Kernel, args: string[]): Promise<boolean>; //TODO NO boolean

  public async run(kernel: Kernel, args: string[]): Promise<boolean> { //TODO NO boolean
    return await this.main(kernel, args);
  }
}
