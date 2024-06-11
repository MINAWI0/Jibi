import {Component, Input, OnInit} from '@angular/core';
import {DialogService} from "../utils/dialog/dialog.service";
import {ActivatedRoute} from "@angular/router";
import {ClientPageComponent} from "../../pages/client-page/client-page.component";

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrl: './recharge.component.css'
})
export class RechargeComponent implements OnInit{
  constructor(private clientPage: ClientPageComponent,private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const dto = params['dto'];
      this.clientPage.loadComponent('invoice',{data: dto})
    });
  }
}
