import * as NapicuUtils from "@Napicu/Utils"
import {Route, Router} from "@angular/router";


export class WebManager{

  public static get_cookies_permission(): boolean { //TODO
    return true;
  }

  protected static angular_router: Router | null = null;

  public static set_angular_router(router: Router): void {
    this.angular_router = router;
  }

  public static get_angular_router(): Router | null {
    return this.angular_router;
  }

  public static navigate_angular_router(path: string): void {
    if(this.angular_router){
      this.angular_router.navigate([path]).then(r => {}, e => {
        NapicuUtils.Console.print_error("web navigating error");
      });
    } else NapicuUtils.Console.print_error("web router does not exist");
  }




}
