import {AfterViewInit, Component, Injector, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {InvoiceComponent} from "../../components/invoice/invoice.component";
import {CreanciersComponent} from "../../components/creanciers/creanciers.component";
import {CreancesComponent} from "../../components/formss/creances.component";
import {FormulairePageComponent} from "../../components/formss/formulaire-page/formulaire-page.component";
import {DashboardComponent} from "../../components/dashboard/dashboard.component";
import {
  ConfirmationPaiementListComponent
} from "../../components/confirmation-paiement-list/confirmation-paiement-list.component";
import {RechargeSoldeComponent} from "../../components/recharge-solde/recharge-solde.component";
import {ImpayesComponent} from "../../components/impayes/impayes/impayes.component";
import {OtpComponent} from "../otp/otp.component";
import {RechargeComponent} from "../../components/recharge/recharge.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.css'
})
export class ClientPageComponent implements OnInit, AfterViewInit{
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true  }) componentContainer!: ViewContainerRef;
  current!: any;
  dto: any
  constructor(private injector: Injector,private route: ActivatedRoute,private router: Router) {}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const encodedDto = params.get('dto');
      if (encodedDto) {
        this.dto = JSON.parse(decodeURIComponent(encodedDto));
        this.loadComponent('invoice',{data: this.dto});
      } else {
        this.router.navigate(['/client'])
      }
    });
  }
  ngAfterViewInit() {
    this.loadComponent('dashboard');
  }

  loadComponent(componentName: string, data?: any) {
    if (this.componentContainer) {
      this.componentContainer.clear();
    }

    let componentType: Type<any> | undefined;
    this.current = componentName;

    switch (componentName) {
      case 'invoice':
        componentType = InvoiceComponent;
        break;
      case 'otp':
        componentType = RechargeComponent;
        break;
      case 'creanciers':
        componentType = CreanciersComponent;
        break;
      case 'creances':
        componentType = CreancesComponent;
        break;
      case 'form':
        componentType = FormulairePageComponent;
        break;
      case 'impayes':
        componentType = ImpayesComponent;
        break;
      case 'dashboard':
        componentType = DashboardComponent;
        break;
      case  'confirmapayment':
        componentType = ConfirmationPaiementListComponent;
        break;
      case  'rechargerSold':
        componentType = RechargeSoldeComponent;
        break;
    }

    if (componentType) {
      const componentRef = this.componentContainer.createComponent(componentType, {
        injector: this.injector,
      });
      if (data) {
        componentRef.instance.data = data;
      }
    }
  }

}
