import {Router} from "@angular/router";
import {Console} from "./Console";
import {WebConfig} from "@Napicu/Config/web/Web";


export class WebManager{
  protected static angular_router: Router | null = null;

  public static load(): void {
    if(!this.is_production_config()) Console.print_information("DEBUGGER IS ENABLED")
  }

  public static is_production_config(): boolean{
    return WebConfig.PRODUCTION_CONFIGURATION;
  }

  public static set_angular_router(router: Router): void {
    this.angular_router = router;
  }

  public static get_angular_router(): Router | null {
    return this.angular_router;
  }

  public static get_angular_router_path(): string | null{
    return this.angular_router?.url || null;
  }

  public static navigate_angular_router(path: string, time_out: number = 0): void {
    setTimeout(() => {
      if(this.angular_router){
        this.angular_router.navigate([path]).then(r => {}, e => {
          Console.print_error("web navigating error");
        });
      } else Console.print_error("web router does not exist");
    }, time_out);
  }

  public static navigate_angular_router_promise(path: string, time_out: number = 0): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        if(this.angular_router){
          this.angular_router.navigate([path]).then(r => resolve(r), e => {
            Console.print_error("web navigating error");
            reject(e);
          });
        } else {
          Console.print_error("web router does not exist");
          reject(false);
        }
      }, time_out);
    });
  }
}
