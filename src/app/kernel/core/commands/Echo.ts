import {Command} from "@Napicu/System/Kernel/core/Command";
import {CommandPromise} from "@Napicu/System/Kernel/interface/CommandManager";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CommandResolve} from "@Napicu/System/Kernel/core/CommandResolve";
import {CommandsResolveCodes} from "@Napicu/System/Kernel/interface/CommandResolve";

export class EchoCommand extends Command {
  protected main(kernel: Kernel, args: string[]): CommandPromise {
    return new Promise<CommandResolve>((resolve, reject) => {
      resolve(new CommandResolve({code: CommandsResolveCodes.success, message: args[0]}));
    });
  }
}
