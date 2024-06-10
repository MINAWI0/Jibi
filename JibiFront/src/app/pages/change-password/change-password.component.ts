import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import {UserService} from "../../services/user/user.service";
import {AlertService} from "../../components/utils/alert/alert.service"
import {MatDialogRef} from "@angular/material/dialog";
import {NavigatorService} from "../../components/utils/navigator/navigator.service"
import {SessionService} from "../../components/utils/session/session.service";
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
    private session: SessionService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private navigatorService: NavigatorService
  ) {}

  ngOnInit(): void {
    this.userId = this.session.decodeToken().user.id
  }

  handleChangePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (this.userId === null) {
      this.errorMessage = 'Invalid user ID!';
      return;
    }

    this.loginService.setPassword(this.userId, this.newPassword).subscribe(
      () => {
        this.successMessage = 'Password updated successfully!';
        this.errorMessage = '';
        this.alertService.showSuccess(this.successMessage);
        this.dialogRef.close(true)
        this.navigatorService.loginNavigation()
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

  isAdmin(user: any): boolean {
    return user && 'username' in user;
  }
}
