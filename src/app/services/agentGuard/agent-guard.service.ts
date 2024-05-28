import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AgentGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const user = this.userService.getUser();
    if (user && this.isAgent(user)) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
  isAgent(user: any): boolean {
    return user && 'numPatente' in user;
  }
}
