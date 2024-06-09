import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login/login.service';
import {UserService} from '../../services/user/user.service';
import {DialogService} from "../../components/utils/dialog/dialog.service";
import {AlertService} from "../../components/utils/alert/alert.service";
import {SessionService}from '../../components/utils/session/session.service';
import {NavigatorService} from "../../components/utils/navigator/navigator.service";

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
    protected dialogService: DialogService,
    protected alertService: AlertService,
    private navigatorService: NavigatorService,
    private session: SessionService
  ) {}

  handleSubmit(event: Event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const loginRequest = {
      username: this.login,
      password: this.password
    };

    this.authService.login(loginRequest).subscribe(
      (response: any) => {
        console.log(response)
        const user = response.role.users.find((user: { username: string; }) => user.username === loginRequest.username);
        this.session.setSessionData({ user: user,role: response.role.name,token: response.token});
        if (user.firstLogin) {
          this.dialogService.openChangePasswordPage()
          return;
        }
        this.dialogService.openLoginPage().close()
        this.navigatorService.loginNavigation()
      },
      (error) => {
        this.alertService.showError(error.error.message)
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

  openresetpass() {
    this.dialogService.openLoginPage().close()
    this.dialogService.openResetPasswordPage()
  }
}
