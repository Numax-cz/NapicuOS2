import {Command} from "@Napicu/System/Kernel/core/Command";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CommandResolve} from "@Napicu/System/Kernel/core/CommandResolve";
import {CommandPromise} from "@Napicu/System/Kernel/interface/CommandManager";
import {CommandsResolveCodes} from "@Napicu/System/Kernel/interface/CommandResolve";

export class UserAddCommand extends Command{
  protected main(kernel: Kernel, args: string[]): CommandPromise {
    return new Promise<CommandResolve>((resolve, reject) => {
      if(!args.length) {
        resolve(this.help_command());
      }
    });
  }


  private help_command(): CommandResolve {
    return new CommandResolve(
      {
        code: CommandsResolveCodes.help_command,
        message:
          `Usage: useradd <username>`
      }
    )
  }
}
