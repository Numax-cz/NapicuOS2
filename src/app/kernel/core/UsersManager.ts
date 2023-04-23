import {UserInterface} from "@Napicu/System/Kernel/interface/Users";

export class UsersManager {
  private users: UserInterface[] = [];




  public delete_user(username: string): void {
    //TODO
  }

  public add_user(user: UserInterface): void {
    //TODO check validation
    this.users.push(user);
  }

}
