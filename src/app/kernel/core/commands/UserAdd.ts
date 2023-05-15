import {Command} from "@Napicu/System/Kernel/core/Command";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CommandResolve} from "@Napicu/System/Kernel/core/CommandResolve";
import {CommandPromise} from "@Napicu/System/Kernel/interface/CommandManager";
import {CommandsResolveCodes} from "@Napicu/System/Kernel/interface/CommandResolve";
import {KernelException} from "@Napicu/System/Kernel/core/exceptions/exceptions";

export class UserAddCommand extends Command{
  protected main(kernel: Kernel, args: string[]): CommandPromise {
    return new Promise<CommandResolve>((resolve, reject) => {
      if(!args.length) {
        resolve(this.help_command());
      } else {
        try {
          kernel.get_users_manager().add_user({username: args[0], password: null});
        } catch (e) {
          const error = e as KernelException;
          reject(new CommandResolve({code: error.code, message: error.message}));
        }
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
