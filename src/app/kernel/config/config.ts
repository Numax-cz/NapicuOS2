import {KernelCookiesDataInterface} from "@Napicu/System/Kernel/interface/Kernel";

export const KernelDefaultRootUser = {username: "root", password: null};

export const KernelDefaultConfig: KernelCookiesDataInterface = {
  computer_name: "napicuos",
  users: [
    KernelDefaultRootUser,
  ],
  active_user: 0
}
