import {CommandManagerTable} from "@Napicu/System/Kernel/interface/CommandManager";
import {EchoCommand} from "@Napicu/System/Kernel/core/commands/Echo";

export const enum KernelBaseCommandsCalls  {
  echo = "echo"
}

export const KernelBaseCommandTable: CommandManagerTable[] = [{command: EchoCommand, call: KernelBaseCommandsCalls.echo}];
