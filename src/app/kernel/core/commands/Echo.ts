import {Command} from "@Napicu/System/Kernel/core/Command";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";

export class EchoCommand extends Command {
  protected main(kernel: Kernel, args: string[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      console.log("ECHO");
      resolve(true);
    });
  }
}
