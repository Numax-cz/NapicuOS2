import {Router} from "@angular/router";
import {Console} from "./Console";


export class WebManager{
  protected static angular_router: Router | null = null;

  public static get_cookies_permission(): boolean { //TODO
    return true;
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
}
