import {WebConfig} from "@Napicu/Config/web/Web";

export class Console{

  public static print_error(msg: string): void {
    console.error(`[NAPICU] - Error: ${msg}`);
  }

  public static print_information(msg: string): void {
    console.log(`[NAPICU] - Information: ${msg}`);
  }

  public static print_error_debug(msg: string): void {
    if(!WebConfig.PRODUCTION_CONFIGURATION) console.error(`[NAPICU - DEBUG] - Error: ${msg}`);
  }

  public static print_information_debug(msg: string): void {
    if(!WebConfig.PRODUCTION_CONFIGURATION) console.log(`[NAPICU - DEBUG] - Information: ${msg}`);
  }

  public static print_any_debug(item: any): void {
    if(!WebConfig.PRODUCTION_CONFIGURATION) console.log(item);
  }
}
