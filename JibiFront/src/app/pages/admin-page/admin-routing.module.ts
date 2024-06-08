import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminPageComponent} from "./admin-page.component";
import {AuthGuard} from "../../services/Guards/authGuard/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
