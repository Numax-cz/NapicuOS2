import {UserInterface} from "@Napicu/System/Kernel/interface/UsersManager";

export class User {
  private username: string;
  private password: string | null = null;
  private is_root: boolean;

  constructor(data: UserInterface) {
    this.username = data.username;
    this.password = data.password;
    this.is_root = data.is_root;
  }

  public get_username(): string {
    return this.username;
  }

  public get_password(): string | null {
    return this.password;
  }

  public is_root_user(): boolean {
    return this.is_root;
  }

  public set_username(username: string): void {
    this.username = username;
  }

  public set_password(password: string): void { // TODO CHECK
    this.password = password;
  }

  public set_permission(perms: boolean): void {
    this.is_root = perms;
  }
}
