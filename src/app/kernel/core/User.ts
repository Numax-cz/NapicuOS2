import {UserInterface} from "@Napicu/System/Kernel/interface/UsersManager";

export class User {
  private username: string;
  private password: string | null = null;

  constructor(data: UserInterface) {
    this.username = data.name;
    this.password = data.password;
  }


  public get_username(): string {
    return this.username;
  }

  public get_password(): string | null {
    return this.password;
  }

  public set_username(username: string): void {
    this.username = username;
  }

  public set_password(password: string): void { // TODO CHECK
    this.password = password;
  }

}
