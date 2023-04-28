import {Process} from "@Napicu/System/Kernel/core/Process";

export type ProcessClass = new() => Process;

export declare type ProcessManagerTable = {process: ProcessClass, program_id: number};
