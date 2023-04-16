import {SystemCookiesKernelDataInterface} from "@Napicu/System/Kernel/interface/Kernel";
import {NapicuOSSystemConfigInterface} from "../interface/config";

export namespace NapicuOSConfig{
  export const COOKIES_NAME: string = "NapicuOS";
}

export const NAPICU_OS_DEFAULT_SYSTEM_CONFIG: SystemCookiesKernelDataInterface<NapicuOSSystemConfigInterface> = {
  data: {
    value: 1
  }
}
