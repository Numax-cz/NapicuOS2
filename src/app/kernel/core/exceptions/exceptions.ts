import {KernelExceptionsCodes} from "@Napicu/System/Kernel/config/exceptions";

export class KernelException extends Error {

  public code: KernelExceptionsCodes

  constructor(code: KernelExceptionsCodes, message?: string) {
    super(message);

    this.code = code;
  }

}
