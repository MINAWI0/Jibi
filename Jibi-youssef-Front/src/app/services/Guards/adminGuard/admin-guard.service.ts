import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {SessionService} from "../../../components/utils/session/session.service"

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): boolean {
    const user = this.sessionService.getUser();
        if (user && this.isAdmin(user)) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
  isAdmin(user: any): boolean {
    return user && 'username' in user &&
      user.username === 'admin'
      && user.password === 'admin'
      && user.nom === 'Admin'
      && user.prenom === 'Admin';
  }
}
