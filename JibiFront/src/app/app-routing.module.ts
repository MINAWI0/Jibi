import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {SuccessSignupPageComponent} from './pages/success-signup-page/success-signup-page.component';
import {AgentPageComponent} from './pages/agent-page/agent-page.component';
import {ChangePasswordComponent} from './pages/change-password/change-password.component';
import {ClientPageComponent} from './pages/client-page/client-page.component';
import {AuthGuard} from "./services/Guards/authGuard/auth-guard.service";
import {AgentGuard} from "./services/Guards/agentGuard/agent-guard.service";
import {ClientGuard} from "./services/Guards/clientGuard/client-guard.service";
import {LoginGuard} from "./services/Guards/loginGuard/login-guard.service";
import {InvoiceComponent} from "./components/invoice/invoice.component";
import {ProClientPageComponent} from "./pages/pro-client-page/pro-client-page.component";
import {QrCodeScannerComponent} from "./components/qr-code-scanner/qr-code-scanner.component";
import {RechargeSoldeComponent} from "./components/recharge-solde/recharge-solde.component";
import {FactureComponent} from "./components/facture/facture.component";
import {RechargeComponent} from "./components/recharge/recharge.component";
import {AccountComponent} from "./components/account/account.component";
import {DonationComponent} from "./components/donation/donation.component";
import {ProClientGuard} from "./services/Guards/proClientGuard/pro-client-guard.service"
import {FormulairePageComponent} from "./components/formss/formulaire-page/formulaire-page.component";
import {CreancesComponent} from "./components/formss/creances.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'success-signup', component: SuccessSignupPageComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'd', component: RechargeComponent },

  { path: 'home', component: HomeComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'login', component: LoginComponent, canActivate:[LoginGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'donation', component: DonationComponent , canActivate: [AuthGuard, ClientGuard] },
  { path: 'facture', component: FactureComponent , canActivate: [AuthGuard, ClientGuard] },
  { path: 'recharge', component: RechargeComponent, canActivate: [AuthGuard, ClientGuard]  },
  { path: 'qr-transfer', component: QrCodeScannerComponent, canActivate: [AuthGuard, ClientGuard] },
  { path: 'recharge-solde', component: RechargeSoldeComponent, canActivate: [AuthGuard, ClientGuard] },
  { path: 'client-pro', component: ProClientPageComponent, canActivate: [AuthGuard, ProClientGuard] },
  { path: 'qr-account', component: AccountComponent, canActivate: [AuthGuard, ClientGuard] },

  { path: 'creances' , component: CreancesComponent},
  {path : 'form/:type' , component : FormulairePageComponent},
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
