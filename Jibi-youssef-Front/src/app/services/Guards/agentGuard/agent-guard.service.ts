import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {SessionService} from "../../../components/utils/session/session.service"

@Injectable({
  providedIn: 'root'
})
export class AgentGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): boolean {
    const role = this.sessionService.getRole();
    if (role && role=='ROLE_AGENT') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }

}
