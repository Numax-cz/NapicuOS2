import * as NapicuComputer from "@Napicu/VirtualComputer";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BiosTextScreenGuard implements CanActivate {
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
