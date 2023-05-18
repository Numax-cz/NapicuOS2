import {Command} from "@Napicu/System/Kernel/core/Command";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CommandPromise} from "@Napicu/System/Kernel/interface/CommandManager";
import {CommandResolve} from "@Napicu/System/Kernel/core/CommandResolve";


export class ClearCommand extends Command {
  protected main(kernel: Kernel, args: string[]): CommandPromise {
    return new Promise<CommandResolve>((resolve, reject) => {
      this.get_console()?.clear_lines();
      resolve(new CommandResolve());
    });
  }
}
