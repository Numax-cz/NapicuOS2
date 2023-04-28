import {Command} from "@Napicu/System/Kernel/core/Command";

export type CommandClass = new() => Command;

export declare interface CommandManagerTableInterface {
  name: string,
  command_class: CommandClass
}
