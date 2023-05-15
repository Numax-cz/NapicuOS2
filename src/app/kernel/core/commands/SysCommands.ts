import {CommandManagerTable} from "@Napicu/System/Kernel/interface/CommandManager";
import {DebugCommand} from "@Napicu/System/Kernel/core/commands/Debug";
import {EchoCommand} from "@Napicu/System/Kernel/core/commands/Echo";
import {UserAddCommand} from "@Napicu/System/Kernel/core/commands/UserAdd";

export const enum KernelBaseCommandsCalls  {
  debug = "debug",
  echo = "echo",
  useradd = "useradd"
}

export const KernelBaseCommandTable: CommandManagerTable[] = [
  {command: DebugCommand, call: KernelBaseCommandsCalls.debug},
  {command: EchoCommand, call: KernelBaseCommandsCalls.echo},
  {command: UserAddCommand, call: KernelBaseCommandsCalls.useradd}
];
