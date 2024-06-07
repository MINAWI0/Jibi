import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-success-signup-page',
  templateUrl: './success-signup-page.component.html',
  styleUrl: './success-signup-page.component.css'
})
export class SuccessSignupPageComponent {

  constructor(private router: Router) {}

  handleLogout() {
    this.router.navigate(['/login']);
  }

}
