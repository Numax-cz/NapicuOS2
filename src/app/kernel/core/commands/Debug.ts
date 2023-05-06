import {Command} from "@Napicu/System/Kernel/core/Command";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CommandResolve} from "@Napicu/System/Kernel/core/CommandResolve";
import {CommandPromise} from "@Napicu/System/Kernel/interface/CommandManager";
import {CommandsResolveCodes} from "@Napicu/System/Kernel/interface/CommandResolve";

export class DebugCommand extends Command {
  protected main(kernel: Kernel, args: string[]): CommandPromise {
    return new Promise<CommandResolve>((resolve, reject) => {
      console.log("Hello World");
      resolve(new CommandResolve({code: CommandsResolveCodes.success}));
    });
  }
}
