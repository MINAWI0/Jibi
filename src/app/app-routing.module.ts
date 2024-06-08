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
import {AuthGuard} from "./services/guards/authGuard/auth-guard.service";
import {AgentGuard} from "./services/guards/agentGuard/agent-guard.service";
import {ClientGuard} from "./services/guards/clientGuard/client-guard.service";
import {AdminGuard} from "./services/guards/adminGuard/admin-guard.service";
import {LoginGuard} from "./services/guards/loginGuard/login-guard.service";
import {AccountComponent} from "./components/account/account.component";
import {QrCodeScannerComponent} from "./components/qr-code-scanner/qr-code-scanner.component";
import {RechargeSoldeComponent} from "./components/recharge-solde/recharge-solde.component";
import {ProClientPageComponent} from "./pages/pro-client-page/pro-client-page.component";
import {ProClientGuard} from "./services/guards/proClientGuard/pro-client-guard.service";
import {
  ConfirmationPaiementListComponent
} from "./components/confirmation-paiement-list/confirmation-paiement-list.component";
import {NormalClientGuardService} from "./services/guards/normalClientGuard/normal-client-guard.service";
import {CreancierComponent} from "./components/creancier/creancier.component";
import {CreanceComponent} from "./components/creance/creance.component";
import {DonationComponent} from "./components/donation/donation.component";
import {FactureComponent} from "./components/facture/facture.component";
import {RechargeComponent} from "./components/recharge/recharge.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'success-signup', component: SuccessSignupPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'agent', component: AgentPageComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'client', component: ClientPageComponent, canActivate: [AuthGuard, NormalClientGuardService], children: [
      { path: 'confirmation-paiements', component: ConfirmationPaiementListComponent }] },
  { path: 'creancier/:creancierId', component: CreancierComponent, canActivate: [AuthGuard, ClientGuard] },
  { path: 'creance/:creanceId', component: CreanceComponent, canActivate: [AuthGuard, ClientGuard]
  },
  { path: 'donation', component: DonationComponent , canActivate: [AuthGuard, ClientGuard] },
  { path: 'facture', component: FactureComponent , canActivate: [AuthGuard, ClientGuard] },
  { path: 'recharge', component: RechargeComponent, canActivate: [AuthGuard, ClientGuard]  },
  { path: 'qr-transfer', component: QrCodeScannerComponent, canActivate: [AuthGuard, ClientGuard] },
  { path: 'recharge-solde', component: RechargeSoldeComponent, canActivate: [AuthGuard, ClientGuard] },
  { path: 'client-pro', component: ProClientPageComponent, canActivate: [AuthGuard, ProClientGuard] },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
