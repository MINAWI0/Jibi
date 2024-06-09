import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {AdminPageComponent} from "./admin-page.component";


@NgModule({
  declarations: [
    AdminPageComponent,
    SidebarComponent
  ],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatIcon,
  ]
})
export class AdminModule { }
