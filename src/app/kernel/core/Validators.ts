import {User} from "@Napicu/System/Kernel/core/User";
import {UserInterface} from "@Napicu/System/Kernel/interface/UsersManager";

export class UserValidator {

  public static check_new_user(user: UserInterface): boolean {



    return false;
  }

  public static check_username(): void {

  }

  public static check_user_password(): void {

  }

  public static check_user_exist(users: User[], username: string): boolean {
    for (const user of users) if(user.get_username().toLowerCase() === username.toLowerCase()) return true;
    return false;
  }
}
