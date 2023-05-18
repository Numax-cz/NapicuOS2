import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";
import {CommandPromise} from "@Napicu/System/Kernel/interface/CommandManager";
import {KernelConsole} from "@Napicu/System/Kernel/core/KernelConsole";

export abstract class Command {
  private declare readonly console: KernelConsole | undefined;

  constructor(console?: KernelConsole) {
    this.console = console
  }

  protected abstract main(kernel: Kernel, args: string[]): CommandPromise; //TODO idk

  public async run(kernel: Kernel, args: string[]): CommandPromise { //TODO idk
    return await this.main(kernel, args);
  }

  protected get_param(args: string[], par: string, callback: () => void): void {
    let ind = args.indexOf("-r");
    if(ind > -1) {
      args.splice(ind, 1);
      callback();
    }
  }

  protected get_console(): KernelConsole | undefined {
    return this.console;
  }

  protected is_root(kernel: Kernel): boolean {
    return (kernel.get_users_manager().get_active_user().is_root_user() || this.console?.auth || false);
  }


}
