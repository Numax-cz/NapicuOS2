import {UserInterface} from "@Napicu/System/Kernel/interface/UsersManager";
import {User} from "@Napicu/System/Kernel/core/User";

export class UsersManager {
  private users: User[] = [];

  private active_user: number = -1;

  public get_user(username: string): User | null {
    for(const user of this.users) {
      if(user.get_username() === username) return user;
    }
    return null;
  }

  public set_users(users: UserInterface[] | undefined): void {
    if(users){
      this.users = [];
      //TODO check validation
      for(const user of users) this.add_user(user);
    }
  }

  public delete_user(username: string): void {
    //TODO
  }

  public add_user(user: UserInterface): void {
    //TODO check validation
    this.users.push(new User(user));
  }

  public get_active_user(): number {
    return this.active_user;
  }


}
