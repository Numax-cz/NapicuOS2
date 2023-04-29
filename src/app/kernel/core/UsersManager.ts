import {UserInterface} from "@Napicu/System/Kernel/interface/UsersManager";

export class UsersManager {
  private users: UserInterface[] = [];

  private active_user: number = -1;

  public get_user(username: string): UserInterface | null {
    for(const user of this.users) {
      if(user.name === username) return user;
    }
    return null;
  }

  public delete_user(username: string): void {
    //TODO
  }

  public add_user(user: UserInterface): void {
    //TODO check validation
    this.users.push(user);
  }

  public get_active_user(): number {
    return this.active_user;
  }


}
