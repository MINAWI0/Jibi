import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {SessionService} from "../session/session.service";

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor(private router: Router,private session: SessionService) { }

  loginNavigation(){
    this.session.getRole();
    switch(this.session.getRole()){
      case 'ROLE_ADMIN':
        this.router.navigate(['/admin']);
        break
      case 'ROLE_AGENT':
        this.router.navigate(['/agent']);
        break
      case 'ROLE_USER':
        this.router.navigate(['/client']);
        break
    }
  }
}
