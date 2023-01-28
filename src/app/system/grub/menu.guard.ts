import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import * as NapicuComputer from "@Napicu/VirtualComputer";

@Injectable({
  providedIn: 'root',
})
export class GrubMenuGuard implements CanActivate {
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
    if (!NapicuComputer.VirtualComputer.get_is_running()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
