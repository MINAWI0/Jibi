import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { UserService } from '../../services/user/user.service';
import { CompteService } from '../../services/compte/compte.service';
import { ComptePaiementService } from '../../services/comptePaiement/compte-paiement.service';
import { ComptePaiementDto } from '../../entities/comptePaiement-dto';

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
    private userService: UserService,
    private compteService: CompteService,
    private comptePaiementService: ComptePaiementService
  ) {}

  handleSubmit(event: Event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const loginRequest = {
      username: this.login,
      password: this.password
    };

    this.authService.login(loginRequest).subscribe(
      (response: any) => {
        const user = JSON.parse(response); // Assuming response is already a JSON object
        this.userService.setUser(user); // Save user data using UserService

        if (user.firstLogin) {
          this.router.navigate(['/change-password'], { queryParams: { userId: user.id } });
          return;
        }

        if (this.isClient(user)) {
          this.comptePaiementService.getComptePaiement(user.numTel).subscribe(
            (comptePaiement: ComptePaiementDto) => {
              this.compteService.setCompte(comptePaiement);
              this.router.navigate(['/client']);
            },
            (error) => {
              console.error(error);
            }
          );
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
