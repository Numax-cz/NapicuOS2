import {CommandManagerTable} from "@Napicu/System/Kernel/interface/CommandManager";
import {DebugCommand} from "@Napicu/System/Kernel/core/commands/Debug";

export const enum KernelBaseCommandsCalls  {
  echo = "debug"
}

export const KernelBaseCommandTable: CommandManagerTable[] = [{command: DebugCommand, call: KernelBaseCommandsCalls.echo}];
