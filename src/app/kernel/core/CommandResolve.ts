import {CommandsResolveCodes} from "@Napicu/System/Kernel/interface/CommandResolve";

export class CommandResolve {
  public declare code: number;

  public declare message: string | null;

  constructor(data?: {code: number, message?: string}) {
    this.code = data?.code || CommandsResolveCodes.success;
    this.message = data?.message || null;
  }

}
