import * as NapicuComputer from "@Napicu/VirtualComputer";
import * as NapicuConfig from "@Napicu/Config";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

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
    if (!NapicuComputer.VirtualComputer.get_is_running()
      && NapicuConfig.Web.ALLOW_ALL_GUARDS) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
