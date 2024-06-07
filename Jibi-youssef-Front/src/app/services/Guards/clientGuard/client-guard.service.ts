import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserService} from "../../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const user = this.userService.getUser();
    return true
    /*
        if (user && this.isClient(user)) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
     */
  }
  isClient(user: any): boolean {
    return user && 'clientType' in user;
  }
}
