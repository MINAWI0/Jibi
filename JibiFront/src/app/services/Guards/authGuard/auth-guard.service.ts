import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {SessionService} from "../../../components/utils/session/session.service"
import {DialogService} from "../../../components/utils/dialog/dialog.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService,private rout: Router,private dialog: DialogService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.sessionService.isLoggedIn();
    if (user) {
      return true;
    } else {
      this.dialog.openLoginPage()
      return false;
    }
  }
}
