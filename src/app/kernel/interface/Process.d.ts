import {Process} from "@Napicu/System/Kernel/core/Process";
import {Kernel} from "@Napicu/System/Kernel/NapicuKernel";

export type ProcessClass = new(kernel: Kernel) => Process;

export declare type ProcessManagerTable = {process: ProcessClass, program_id: number};
