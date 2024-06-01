import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserService} from "../../user/user.service";
import {DialogService} from "../../../components/utils/dialog/dialog.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService,private rout: Router,private dialog: DialogService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.userService.getUser();
    /*if (user) {
      return true;
    } else {
      this.rout.navigate(['/home']);
      this.dialog.openLoginPage()
      return false;
    }*/
    return true
  }
}
