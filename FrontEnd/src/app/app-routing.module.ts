import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {CreateClientComponent} from './components/create-client/create-client.component';
import {SuccessSignupPageComponent} from './pages/success-signup-page/success-signup-page.component';
import {AgentPageComponent} from './pages/agent-page/agent-page.component';
import {ChangePasswordComponent} from './pages/change-password/change-password.component';
import {ClientPageComponent} from './pages/client-page/client-page.component';
import {AuthGuard} from "./services/Guards/authGuard/auth-guard.service";
import {AgentGuard} from "./services/Guards/agentGuard/agent-guard.service";
import {ClientGuard} from "./services/Guards/clientGuard/client-guard.service";
import {LoginGuard} from "./services/Guards/loginGuard/login-guard.service";
import {InvoiceComponent} from "./components/invoice/invoice.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'success-signup', component: SuccessSignupPageComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'home', component: HomeComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'login', component: LoginComponent, canActivate:[LoginGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'agent',
    component: AgentPageComponent,
    canActivate: [AuthGuard, AgentGuard],
  },
  {
    path: 'client',
    component: ClientPageComponent,
    canActivate: [AuthGuard, ClientGuard],
  },
  { path: 'admin', loadChildren: () => import('./pages/admin-page/admin.module').then(m => m.AdminModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
