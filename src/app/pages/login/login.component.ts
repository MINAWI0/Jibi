import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../../services/login/login.service";

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

  constructor(private router: Router, private authService: LoginService) {}

  handleSubmit(event: Event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const loginRequest = {
      username: this.login,
      password: this.password
    };

    this.authService.login(loginRequest).subscribe(
      (response: any) => {
        const user = JSON.parse(response);
        console.log(user.firstLogin);
        if (user.firstLogin) {
          this.router.navigate(['/change-password'], { queryParams: { userId: user.id } });
          return;
        }
        if (this.isClient(response) ) {
          this.router.navigate(['/client']);
        } else if (this.isAgent(response)) {
          this.router.navigate(['/agent']);
        } else if (this.isAdmin(response)) {
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
    const obj: Object = JSON.parse(user);
    // Check if the user has admin-specific properties
    console.log("admin");
    return obj && 'username' in obj ;

  }

  isAgent(user: any): boolean {
    const obj: Object = JSON.parse(user);
    // Check if the user has agent-specific properties
    console.log("agent");
    return obj && 'numPatente' in obj;
  }

  isClient(user: any): boolean {
    const obj: Object = JSON.parse(user);
    // Check if the user has client-specific properties
    return obj && 'clientType' in obj;
  }
}
