import {Command} from "@Napicu/System/Kernel/core/Command";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CommandResolve} from "@Napicu/System/Kernel/core/CommandResolve";
import {CommandPromise} from "@Napicu/System/Kernel/interface/CommandManager";
import {CommandsResolveCodes} from "@Napicu/System/Kernel/interface/CommandResolve";
import {KernelException} from "@Napicu/System/Kernel/core/exceptions/exceptions";
import {KernelBaseCommandsCalls} from "@Napicu/System/Kernel/core/commands/SysCommands";

export class UserAddCommand extends Command {
  protected main(kernel: Kernel, args: string[]): CommandPromise {
    return new Promise<CommandResolve>((resolve, reject) => {
      if(!args.length) {
        resolve(this.help_command());
      } else {
        let is_root = false;

        this.get_param(args, "-r", () => {
          if(!this.is_root(kernel)) {
            reject(new CommandResolve({code: CommandsResolveCodes.no_permission, message: "You don't have permission to create a root user."}));
          } else is_root = true
        });

        try {
          kernel.get_users_manager().add_user({username: args[0], password: null, is_root: is_root});
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
        `Usage: ${KernelBaseCommandsCalls.useradd} <username>
        \nOptions:
        -r [Creates a new user with root permissions]`
      }
    )
  }
}
