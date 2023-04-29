import {Command} from "@Napicu/System/Kernel/core/Command";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";

export class EchoCommand extends Command {
  protected main(kernel: Kernel, args: string[]): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      console.log("Hello World");
      resolve(1);
    });
  }
}
