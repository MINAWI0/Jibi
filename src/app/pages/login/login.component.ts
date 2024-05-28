import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: LoginService,
    private userService: UserService
  ) {}

  handleSubmit(event: Event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const loginRequest = {
      username: this.login,
      password: this.password
    };

    this.authService.login(loginRequest).subscribe(
      (response: any) => {
        const user = JSON.parse(response);
        this.userService.setUser(user); // Save user data to localStorage

        if (user.firstLogin) {
          this.router.navigate(['/change-password'], { queryParams: { userId: user.id } });
          return;
        }
        if (this.isClient(user)) {
          this.router.navigate(['/client']);
        } else if (this.isAgent(user)) {
          this.router.navigate(['/agent']);
        } else if (this.isAdmin(user)) {
          this.router.navigate(['/admin']);
        } else {
          this.errorMessage = 'User not found or unauthorized.';
        }
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password. Please try again.';
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      }
    );
  }

  isAdmin(user: any): boolean {
    return user && 'username' in user;
  }

  isAgent(user: any): boolean {
    return user && 'numPatente' in user;
  }

  isClient(user: any): boolean {
    return user && 'clientType' in user;
  }
}
