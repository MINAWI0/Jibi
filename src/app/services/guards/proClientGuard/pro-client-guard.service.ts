import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserService} from "../../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class ProClientGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const user = this.userService.getUser();
    if (user && this.isClientPro(user)) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
  isClientPro(user:any): boolean{
    return user && 'clientType' in user && user.clientType ==='Hsab_PRO';
  }
}
