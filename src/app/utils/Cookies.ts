import {WebManager} from "./WebManager";
import {CookiesConfig} from "../config/web/CookiesConfig";


export class Cookies{
  /**
   * Sets the value of cookies
   * @param {String} name Name of cookies
   * @param {string} value Value of cookies
   */
  public static setCookies<T>(name: string, value: T): void {
    if(WebManager.get_cookies_permission()){
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
    if(WebManager.get_cookies_permission()){
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
