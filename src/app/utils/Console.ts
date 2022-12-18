import * as NapicuConfig from "@Napicu/Config";

export class Console{

  public static print_error(msg: string): void {
    console.error(`[NAPICU] - Error: ${msg}`);
  }

  public static print_information(msg: string): void {
    console.log(`[NAPICU] - Information: ${msg}`);
  }

  public static print_error_debug(msg: string): void {
  console.error(`[NAPICU] - Error: ${msg}`);
  }

  public static print_information_debug(msg: string): void {
    console.log(`[NAPICU] - Information: ${msg}`);
  }

  public static print_any_debug(item: any): void {
   console.log(item);
  }
}
