import {Command} from "@Napicu/System/Kernel/core/Command";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CommandPromise} from "@Napicu/System/Kernel/interface/CommandManager";
import {CommandResolve} from "@Napicu/System/Kernel/core/CommandResolve";
import {CommandsResolveCodes} from "@Napicu/System/Kernel/interface/CommandResolve";

export class SudoCommand extends Command {
  protected static readonly max_password_attempt: number = 3;

  protected main(kernel: Kernel, args: string[]): CommandPromise {
    return new Promise<CommandResolve>(async (resolve, reject) => {
      if(!kernel.get_users_manager().get_active_user().is_root_user()) {
        let attempt = 0;
        do {
          await this.verify_user(kernel.get_users_manager().get_active_user().get_username()).then((value: string | undefined) => {
            if(value && kernel.get_users_manager().get_active_user().auth_password(value)) {
              this.get_console()!.auth = true;
            } else {
              if(attempt + 1 >= SudoCommand.max_password_attempt) reject(new CommandResolve({code: CommandsResolveCodes.no_auth, message: `sudo: ${SudoCommand.max_password_attempt} incorrect password attempts.`}))
              else this.get_console()?.println("Sorry, try again.");
            }
          });
          attempt++;
        } while (attempt < SudoCommand.max_password_attempt && !this.get_console()?.auth);
      }

      resolve(kernel.run_command(args[0], args.splice(1), this.get_console()).then((c) => c));
    });
  }

  protected async verify_user(username: string): Promise<string | undefined> {
    this.get_console()?.println(`[sudo] password for ${username}:`);
    return this.get_console()?.get_input();
  }
}

