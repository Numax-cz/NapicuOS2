import {KernelCoreGUIComponent} from "@Napicu/System/Kernel/core/gui/Gui";

export interface SystemDataDriveInterface{
  system_boot: any
}

export declare interface TypeKernelComponent<T> extends KernelCoreGUIComponent{
  new (...args: any[]): T;
}

export interface SystemCookiesKernelDataInterface<T> {
  data: T
}



