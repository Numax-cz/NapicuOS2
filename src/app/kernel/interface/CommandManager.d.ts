import {Command} from "@Napicu/System/Kernel/core/Command";
import {CommandResolve} from "@Napicu/System/Kernel/core/CommandResolve";

export type CommandPromise = Promise<CommandResolve>;



export type CommandClass = new() => Command;

export declare type CommandManagerTable = {command: CommandClass, call: string};
