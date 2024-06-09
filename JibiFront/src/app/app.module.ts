import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {LoginComponent} from './pages/login/login.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateAgentComponent} from './components/create-agent/create-agent.component';
import {CreateClientComponent} from './components/create-client/create-client.component';
import {SuccessSignupPageComponent} from './pages/success-signup-page/success-signup-page.component';
import {AgentPageComponent} from './pages/agent-page/agent-page.component';
import {ChangePasswordComponent} from './pages/change-password/change-password.component';
import {ClientPageComponent} from './pages/client-page/client-page.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIcon} from "@angular/material/icon";
import {InvoiceComponent} from './components/invoice/invoice.component';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {KeyValuePipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/autocomplete";
import {AdminModule} from "./pages/admin-page/admin.module";
import {ProClientPageComponent} from './pages/pro-client-page/pro-client-page.component';
import {QrCodeComponent} from "./components/qr-code/qr-code.component";
import {QrCodeScannerComponent} from "./components/qr-code-scanner/qr-code-scanner.component";
import {RechargeSoldeComponent} from "./components/recharge-solde/recharge-solde.component";
import {FactureComponent} from "./components/facture/facture.component";
import {RechargeComponent} from "./components/recharge/recharge.component";
import {AccountComponent} from "./components/account/account.component";
import {
  ConfirmationPaiementListComponent
} from "./components/confirmation-paiement-list/confirmation-paiement-list.component"
import {CreancierComponent} from "./components/creancier/creancier.component"
import {CreanceComponent} from "./components/creance/creance.component";
import {DonationComponent} from "./components/donation/donation.component";
import {CreanciersComponent} from "./components/creanciers/creanciers.component";

import {NgxScannerQrcodeModule} from "ngx-scanner-qrcode";
import {CheckIcon} from "primeng/icons/check";
import {ArrowDownIcon} from "primeng/icons/arrowdown";
import {ClientsListComponent} from './components/clients-list/clients-list.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {CreancesComponent} from "./components/formss/creances.component";
import {FormulairePageComponent} from "./components/formss/formulaire-page/formulaire-page.component";
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    CreateAgentComponent,
    CreateClientComponent,
    SuccessSignupPageComponent,
    ChangePasswordComponent,
    ClientPageComponent,
    InvoiceComponent,
    LoginComponent,
    ProClientPageComponent,

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
    CreancierComponent,
    CreanceComponent,
    FactureComponent,
    DonationComponent,
    RechargeComponent,
    ClientsListComponent,
    CreanciersComponent,
    CreancesComponent,
    ClientPageComponent,
    FormulairePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    KeyValuePipe,
    NgForOf,
    ReactiveFormsModule,
    MatIcon,
    MatStepper,
    MatStep,
    MatOption,
    MatStepLabel,
    MatButton,
    MatStepperNext,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    AdminModule,
    ReactiveFormsModule,
    FormsModule,
    NgxScannerQrcodeModule,
    NgOptimizedImage,
    CheckIcon,
    ArrowDownIcon,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatRow,
    MatHeaderRow,
    MatPaginator,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    RouterModule,
    NgxQRCodeModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  exports: [
    HeaderComponent
  ]
})
export class AppModule { }
