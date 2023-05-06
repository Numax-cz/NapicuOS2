import {CommandManagerTable} from "@Napicu/System/Kernel/interface/CommandManager";
import {DebugCommand} from "@Napicu/System/Kernel/core/commands/Debug";
import {EchoCommand} from "@Napicu/System/Kernel/core/commands/Echo";

export const enum KernelBaseCommandsCalls  {
  debug = "debug",
  echo = "echo"
}

export const KernelBaseCommandTable: CommandManagerTable[] = [
  {command: DebugCommand, call: KernelBaseCommandsCalls.debug},
  {command: EchoCommand, call: KernelBaseCommandsCalls.echo}
];
