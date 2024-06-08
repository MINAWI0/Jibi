import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CreateAgentComponent } from './components/create-agent/create-agent.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import { SuccessSignupPageComponent } from './pages/success-signup-page/success-signup-page.component';
import { AgentPageComponent } from './pages/agent-page/agent-page.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ClientPageComponent } from './pages/client-page/client-page.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import {QRCodeModule} from "angularx-qrcode";
import { AccountComponent } from './components/account/account.component';
import {NgxScannerQrcodeModule} from "ngx-scanner-qrcode";
import { QrCodeScannerComponent } from './components/qr-code-scanner/qr-code-scanner.component';
import { RechargeSoldeComponent } from './components/recharge-solde/recharge-solde.component';
import { ProClientPageComponent } from './pages/pro-client-page/pro-client-page.component';
import {
  ConfirmationPaiementListComponent
} from "./components/confirmation-paiement-list/confirmation-paiement-list.component";
import {NgOptimizedImage} from "@angular/common";
import {CheckIcon} from "primeng/icons/check";
import {ArrowDownIcon} from "primeng/icons/arrowdown";
import { CreanciersComponent } from './components/creanciers/creanciers.component';
import { CreancesComponent } from './components/creances/creances.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    AdminPageComponent,
    CreateAgentComponent,
    CreateClientComponent,
    SuccessSignupPageComponent,
    AgentPageComponent,
    ChangePasswordComponent,
    ClientPageComponent,
    QrCodeComponent,
    AccountComponent,
    QrCodeScannerComponent,
    RechargeSoldeComponent,
    ProClientPageComponent,
    ConfirmationPaiementListComponent,
    CreanciersComponent,
    CreancesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule,
    NgxScannerQrcodeModule,
    NgOptimizedImage,
    CheckIcon,
    ArrowDownIcon,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
