import { NgModule } from '@angular/core';
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
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
