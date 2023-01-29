import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {VirtualComputer} from "../VirtualComputer";
import {WebConfig} from "../../config/web/WebConfig";

@Injectable({
  providedIn: 'root',
})
export class IsRunningGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!VirtualComputer.get_is_running()
      && WebConfig.ALLOW_ALL_GUARDS) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
