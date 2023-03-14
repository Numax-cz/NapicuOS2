import {Cookies} from "@Napicu/Utils/Cookies";

export class CookiesConfigurator<T>{

  protected declare name: string;

  protected declare value: T;

  constructor(name: string, default_config: T) {
    this.name = name;
    this.value = default_config;
  }

  public set_value(value: T): void {
    this.value = value;
  }

  public try_load_config_from_cookies(): boolean {
    let data: T | null = Cookies.getCookies<T>(this.name);
    if(data){
      this.value = data;
      return true;
    }
    return false;
  }

  public save_config(): void {
    Cookies.setCookies<T>(this.name, this.value);
  }

  public get_config(): T {
    return this.value;
  }
}
