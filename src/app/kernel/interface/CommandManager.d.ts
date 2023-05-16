import {Command} from "@Napicu/System/Kernel/core/Command";
import {CommandResolve} from "@Napicu/System/Kernel/core/CommandResolve";
import {KernelConsole} from "@Napicu/System/Kernel/core/KernelConsole";

export type CommandPromise = Promise<CommandResolve>;



export type CommandClass = new(console?: KernelConsole) => Command;

export declare type CommandManagerTable = {command: CommandClass, call: string};
