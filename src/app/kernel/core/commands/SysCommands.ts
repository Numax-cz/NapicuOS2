import {CommandManagerTable} from "@Napicu/System/Kernel/interface/CommandManager";
import {DebugCommand} from "@Napicu/System/Kernel/core/commands/Debug";
import {EchoCommand} from "@Napicu/System/Kernel/core/commands/Echo";
import {UserAddCommand} from "@Napicu/System/Kernel/core/commands/UserAdd";
import {UserdelCommand} from "@Napicu/System/Kernel/core/commands/Userdel";
import {SudoCommand} from "@Napicu/System/Kernel/core/commands/Sudo";
import {ClearCommand} from "@Napicu/System/Kernel/core/commands/Clear";
import {PasswdCommand} from "@Napicu/System/Kernel/core/commands/Passwd";
import {LsCommand} from "@Napicu/System/Kernel/core/commands/Ls";

export const enum KernelBaseCommandsCalls  {
  debug = "debug",
  echo = "echo",
  useradd = "useradd",
  userdel = "userdel",
  sudo = "sudo",
  clear = "clear",
  passwd = "passwd",
  ls = "ls",
}

export const KernelBaseCommandTable: CommandManagerTable[] = [
  {command: DebugCommand, call: KernelBaseCommandsCalls.debug},
  {command: EchoCommand, call: KernelBaseCommandsCalls.echo},
  {command: UserAddCommand, call: KernelBaseCommandsCalls.useradd},
  {command: UserdelCommand, call: KernelBaseCommandsCalls.userdel},
  {command: ClearCommand, call: KernelBaseCommandsCalls.clear},
  {command: SudoCommand, call: KernelBaseCommandsCalls.sudo},
  {command: PasswdCommand, call: KernelBaseCommandsCalls.passwd},
  {command: LsCommand, call: KernelBaseCommandsCalls.ls},
];
