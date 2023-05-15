import {KernelCoreGUIComponent} from "@Napicu/System/Kernel/core/gui/Gui";
import {UserInterface} from "@Napicu/System/Kernel/interface/UsersManager";

export interface SystemDataDriveInterface{
  system_boot: any
}

export declare interface TypeKernelComponent<T> extends KernelCoreGUIComponent{
  new (...args: any[]): T;
}


export interface KernelCookiesDataInterface {
  computer_name: string
  users: UserInterface[],
  active_user: number
}

export interface SystemCookiesKernelDataInterface<T> {
  kernel?: KernelCookiesDataInterface
  data: T
}



