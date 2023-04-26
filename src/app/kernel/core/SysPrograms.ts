import {Time} from "@Napicu/System/Kernel/core/programs/Time";
import {ProcessManagerProcessTable} from "@Napicu/System/Kernel/interface/Process";


export const enum KernelBaseProcessProgramsID  {
  Time = 0
}

export const KernelBaseProcessTable: ProcessManagerProcessTable[] = [{process: Time, program_id: KernelBaseProcessProgramsID.Time}];
