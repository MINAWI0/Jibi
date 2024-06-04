import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
import {provideHttpClient, withFetch} from "@angular/common/http";
import {SuccessSignupPageComponent} from './pages/success-signup-page/success-signup-page.component';
import {AgentPageComponent} from './pages/agent-page/agent-page.component';
import {ChangePasswordComponent} from './pages/change-password/change-password.component';
import {ClientPageComponent} from './pages/client-page/client-page.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIcon} from "@angular/material/icon";
import {InvoiceComponent} from './components/invoice/invoice.component';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {KeyValuePipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/autocomplete";
import {AdminModule} from "./pages/admin-page/admin.module";

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
    AgentPageComponent,
    ChangePasswordComponent,
    ClientPageComponent,
    InvoiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIcon,
    MatStepper,
    MatStep,
    KeyValuePipe,
    NgForOf,
    ReactiveFormsModule,
    MatStepLabel,
    MatButton,
    MatStepperNext,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    AdminModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  exports: [
    HeaderComponent
  ]
})
export class AppModule { }
