import {Command} from "@Napicu/System/Kernel/core/Command";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CommandPromise} from "@Napicu/System/Kernel/interface/CommandManager";
import {CommandResolve} from "@Napicu/System/Kernel/core/CommandResolve";
import {CommandsResolveCodes} from "@Napicu/System/Kernel/interface/CommandResolve";

export class SudoCommand extends Command {

  protected main(kernel: Kernel, args: string[]): CommandPromise {
    return new Promise<CommandResolve>(async (resolve, reject) => {
      if(!kernel.get_users_manager().get_active_user().is_root_user()) {
        await this.verify_user(kernel.get_users_manager().get_active_user().get_username());
        resolve(new CommandResolve({code: CommandsResolveCodes.success, message: "HOO"}));
      }
      //kernel.run_command()
    });
  }

  protected async verify_user(username: string): Promise<void> {
    this.get_console()?.println(`[sudo] password for ${username}:`);
    await this.get_console()?.get_input().then((value: string) => {
      console.log(`INPUT IS ${value}`);
    })
  }
}

