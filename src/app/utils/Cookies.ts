import {CookiesConfig} from "../config/web/CookiesConfig";

export const enum CookiesCookiesPermissionsEnum {
  deny = 0,
  allow = 1,
  unchecked = 2
}

export class Cookies{
  protected static allow_cookies: CookiesCookiesPermissionsEnum = document.cookie.length
    ? CookiesCookiesPermissionsEnum.allow : CookiesCookiesPermissionsEnum.unchecked;

  public static get_cookies_permission(): CookiesCookiesPermissionsEnum{
    return this.allow_cookies;
  }

  /**
   * Enable web cookies
   */
  public static enable_cookies(): void {
    this.allow_cookies = CookiesCookiesPermissionsEnum.allow;
  }

  /**
   * Disable web cookies
   */
  public static disable_cookies(): void {
    this.allow_cookies = CookiesCookiesPermissionsEnum.deny;
  }

  /**
   * Sets the value of cookies
   * @param {String} name Name of cookies
   * @param {string} value Value of cookies
   */
  public static setCookies<T>(name: string, value: T): void {
    if(this.allow_cookies == CookiesCookiesPermissionsEnum.allow){
      const date: Date = new Date();
      date.setTime(date.getTime() + CookiesConfig.WEB_COOKIES_LIFE_TIME);
      document.cookie =
        name + '=' + JSON.stringify(value) + '; expires=' + date.toUTCString() + '; path=/';
    }
  }
  /**
   * Returns the value of the specified cookie name
   * @param  {String} name Name of cookies
   * @returns {any} value of cookies
   */
  public static getCookies<T>(name: string): T | null {
    if(this.allow_cookies == CookiesCookiesPermissionsEnum.allow){
      const value: string = '; ' + document.cookie;
      const parts = value.split('; ' + name + '=');
      if (parts.length == 2) {
        let i = parts.pop()?.split(';').shift();
        if (i) return JSON.parse(i);
      }
    }
    return null;
  }

  /**
   * Deletes the specified cookie
   * @param  {String} name Name of cookies
   */
  public static deleteCookies(name: string): void {
    const date = new Date();
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
    document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
  }
}
