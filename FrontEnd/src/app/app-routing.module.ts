import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CreateAgentComponent } from './components/create-agent/create-agent.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { SuccessSignupPageComponent } from './pages/success-signup-page/success-signup-page.component';
import { AgentPageComponent } from './pages/agent-page/agent-page.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ClientPageComponent } from './pages/client-page/client-page.component';
import {AuthGuard} from "./services/Guards/authGuard/auth-guard.service";
import {AgentGuard} from "./services/Guards/agentGuard/agent-guard.service";
import {ClientGuard} from "./services/Guards/clientGuard/client-guard.service";
import {AdminGuard} from "./services/Guards/adminGuard/admin-guard.service";
import {LoginGuard} from "./services/Guards/loginGuard/login-guard.service";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'success-signup', component: SuccessSignupPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'client', component: ClientPageComponent, canActivate: [AuthGuard, ClientGuard] },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'login', component: LoginComponent, canActivate:[LoginGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', redirectTo: 'create-agent', pathMatch: 'full' },
      { path: 'create-agent', component: CreateAgentComponent },
    ]
  },
  {
    path: 'agent',
    component: AgentPageComponent,
    canActivate: [AuthGuard, AgentGuard],
    children: [
      { path: '', redirectTo: 'create-client', pathMatch: 'full' },
      { path: 'create-client', component: CreateClientComponent }
    ]
  },
  {
    path: 'client',
    component: ClientPageComponent,
    canActivate: [AuthGuard, ClientGuard],
    children: [
      { path: '', redirectTo: 'create-client', pathMatch: 'full' },
      { path: 'create-client', component: CreateClientComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
