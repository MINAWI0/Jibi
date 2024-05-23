import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

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
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = +params['userId'] || null;
    });
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
        this.successMessage = 'Password successfully updated!';
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error setting password:', error);
        this.errorMessage = 'Failed to update password. Please try again.';
      }
    );
  }
}
