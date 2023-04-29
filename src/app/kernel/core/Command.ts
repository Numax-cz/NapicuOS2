import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";

export abstract class Command {

  protected abstract main(kernel: Kernel, args: string[]): Promise<number>; //TODO idk

  public async run(kernel: Kernel, args: string[]): Promise<number> { //TODO idk
    return await this.main(kernel, args);
  }
}
