import {KernelCookiesDataInterface} from "@Napicu/System/Kernel/interface/Kernel";
import {UserInterface} from "@Napicu/System/Kernel/interface/UsersManager";

export const KernelDefaultRootUser: UserInterface = {username: "root", password: "root", is_root: false};

export const KernelDefaultConfig: KernelCookiesDataInterface = {
  computer_name: "napicuos",
  users: [
    KernelDefaultRootUser,
  ],
  active_user: 0
}
