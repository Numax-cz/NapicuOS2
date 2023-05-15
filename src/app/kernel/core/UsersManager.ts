import {UserInterface} from "@Napicu/System/Kernel/interface/UsersManager";
import {User} from "@Napicu/System/Kernel/core/User";
import {UserValidator} from "@Napicu/System/Kernel/core/Validators";
import {check_string_match_ignore_case} from "@Napicu/Utils/String";
import {KernelDefaultRootUser} from "@Napicu/System/Kernel/config/config";
import {KernelExceptionsCodes} from "@Napicu/System/Kernel/config/exceptions";
import {KernelException} from "@Napicu/System/Kernel/core/exceptions/exceptions";

export class UsersManager {
  private users: User[] = [];

  private active_user: number = -1;

  public add_user(user: UserInterface): void {
    try {
      UserValidator.check_new_user(user, this.users);
    } catch (e)  {
      throw e;
    }

    this.users.push(new User(user));
  }

  public delete_user(username: string): void {
    for (let i = 0; i < this.users.length; i++){
      const nm: string = this.users[i].get_username();
      if(check_string_match_ignore_case(nm, username) && nm !== KernelDefaultRootUser.username) {
        this.users.splice(i, 1);
        return;
      }
    }
    throw new KernelException(KernelExceptionsCodes.USER_NOT_EXISTS, "User doesn't exist");
  }

  public set_active_user(index: number): number {
    return (this.active_user = (this.users[index]) ? index : -1);
  }

  public set_users(users: UserInterface[] | undefined): void {
    if(users){
      this.users = [];
      //TODO check validation
      for(const user of users) this.add_user(user);
    }
  }

  public get_user(username: string): User | null {
    for(const user of this.users) {
      if(user.get_username() === username) return user;
    }
    return null;
  }

  public get_active_user_index(): number {
    return this.active_user;
  }

  public get_active_user(): User {
    return this.users[this.active_user];
  }
}
