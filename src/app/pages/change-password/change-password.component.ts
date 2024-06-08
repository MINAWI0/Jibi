import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import {UserService} from "../../services/user/user.service";
import {CompteService} from "../../services/compte/compte.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userId: number | null = null;
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private compte: CompteService
  ) {}

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     this.userId = +params['userId'] || null;
  //   });
  //
  // }
  ngOnInit(): void {
    const user = this.userService.getUser();
    this.userId = user ? user.id : null;
  }

  handleChangePassword(): void {
    if (this.newPassword === '' || this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

  if (this.userId === null) {
      this.errorMessage = 'Invalid user ID!';
      return;
    }

    this.loginService.setPassword(this.userId, this.newPassword).subscribe(
      () => {
        this.successMessage = 'Password successfully updated!';
        this.errorMessage = '';
        this.userService.clearUser();
        this.compte.clearCompte();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error setting password:', error);
        this.errorMessage = 'Failed to update password. Please try again.';
        this.successMessage = '';
      }
    );
  }

  isValidPassword(password: string): boolean {
    return password.length >= 8;
  }
}
