import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CommandResolve} from "@Napicu/System/Kernel/interface/CommandManager";

export abstract class Command {

  protected abstract main(kernel: Kernel, args: string[]): CommandResolve; //TODO idk

  public async run(kernel: Kernel, args: string[]): CommandResolve { //TODO idk
    return await this.main(kernel, args);
  }
}
