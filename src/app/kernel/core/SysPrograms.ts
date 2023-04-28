import {Time} from "@Napicu/System/Kernel/core/programs/Time";
import {ProcessManagerTable} from "@Napicu/System/Kernel/interface/Process";


export const enum KernelBaseProcessProgramsID  {
  Time = 0
}

export const KernelBaseProcessTable: ProcessManagerTable[] = [{process: Time, program_id: KernelBaseProcessProgramsID.Time}];
