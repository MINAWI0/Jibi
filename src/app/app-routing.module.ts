import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {LoginComponent} from "./pages/login/login.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";
import {CreateAgentComponent} from "./components/create-agent/create-agent.component";
import {CreateClientComponent} from "./components/create-client/create-client.component";
import {SuccessSignupPageComponent} from "./pages/success-signup-page/success-signup-page.component";
import {AgentPageComponent} from "./pages/agent-page/agent-page.component";
import {ChangePasswordComponent} from "./pages/change-password/change-password.component";
import {ClientPageComponent} from "./pages/client-page/client-page.component";

const routes: Routes = [
  {path: '',redirectTo: 'home',pathMatch: 'full'},
  {path:'success-signup', component:SuccessSignupPageComponent },
  {path: 'home',component: HomeComponent},
  {path: 'agent', component:AgentPageComponent},
  {path: 'client', component:ClientPageComponent},
  {path: 'change-password', component:ChangePasswordComponent},
  {path: 'login',component: LoginComponent},
  {path: 'forgot-password',component: ForgotPasswordComponent},
  {path: 'admin',component: AdminPageComponent,children:[
      { path: '', redirectTo: 'create-agent', pathMatch: 'full' },
      {path: 'create-agent',component: CreateAgentComponent },
      {path: 'create-client',component: CreateClientComponent}
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
