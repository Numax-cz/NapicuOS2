import {Command} from "@Napicu/System/Kernel/core/Command";

export type CommandClass = new() => Command;

export declare type CommandManagerTable = {command: CommandClass, call: string};
