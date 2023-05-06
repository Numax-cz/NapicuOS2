import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CommandPromise} from "@Napicu/System/Kernel/interface/CommandManager";

export abstract class Command {

  protected abstract main(kernel: Kernel, args: string[]): CommandPromise; //TODO idk

  public async run(kernel: Kernel, args: string[]): CommandPromise { //TODO idk
    return await this.main(kernel, args);
  }
}
