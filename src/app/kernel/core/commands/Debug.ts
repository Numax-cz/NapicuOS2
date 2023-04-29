import {Command} from "@Napicu/System/Kernel/core/Command";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";

export class DebugCommand extends Command {
  protected main(kernel: Kernel, args: string[]): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      console.log("Hello World");
      resolve(1);
    });
  }
}
