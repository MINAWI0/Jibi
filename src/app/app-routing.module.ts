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
import {AuthGuard} from "./services/authGuard/auth-guard.service";
import {AgentGuard} from "./services/agentGuard/agent-guard.service";
import {ClientGuard} from "./services/clientGuard/client-guard.service";
import {AdminGuard} from "./services/adminGuard/admin-guard.service";
import {LoginGuard} from "./services/loginGuard/login-guard.service";
import {AccountComponent} from "./components/account/account.component";
import {QrCodeScannerComponent} from "./components/qr-code-scanner/qr-code-scanner.component";
import {RechargeSoldeComponent} from "./components/recharge-solde/recharge-solde.component";
import {ProClientPageComponent} from "./pages/pro-client-page/pro-client-page.component";
import {ProClientGuard} from "./services/proClientGuard/pro-client-guard.service";
import {
  ConfirmationPaiementListComponent
} from "./components/confirmation-paiement-list/confirmation-paiement-list.component";
import {CreancesComponent} from "./components/creances/creances.component";
import {CreanciersComponent} from "./components/creanciers/creanciers.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'success-signup', component: SuccessSignupPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'agent', component: AgentPageComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'client', component: ClientPageComponent, canActivate: [AuthGuard, ClientGuard], children: [
      { path: 'confirmation-paiements', component: ConfirmationPaiementListComponent }] },
  { path: 'qr-transfer', component: QrCodeScannerComponent, canActivate: [AuthGuard, ClientGuard] },
  { path: 'recharge-solde', component: RechargeSoldeComponent, canActivate: [AuthGuard, ClientGuard] },
  { path: 'pro-client', component: ProClientPageComponent, canActivate: [AuthGuard, ProClientGuard] },
  { path: 'qr-account', component: AccountComponent, canActivate: [AuthGuard, ClientGuard] },
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
      { path: 'create-client', component: CreateClientComponent }
    ]
  },
  {path:'creances', component:CreancesComponent},
  {path:'creanciers', component:CreanciersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
