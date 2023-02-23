import {Process} from "@Napicu/System/Kernel/core/Process";
import {Time} from "@Napicu/System/Kernel/core/programs/Time";

export const KernelBaseProcess: Process[] = [new Time()];
