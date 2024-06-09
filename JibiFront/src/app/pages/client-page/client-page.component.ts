import {AfterViewInit, Component, Injector, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {CreateClientComponent} from "../../components/create-client/create-client.component";
import {InvoiceComponent} from "../../components/invoice/invoice.component";
import {CreanciersComponent} from "../../components/creanciers/creanciers.component";
import {CreancesComponent} from "../../components/formss/creances.component";
import {FormulairePageComponent} from "../../components/formss/formulaire-page/formulaire-page.component";
import {AccountComponent} from "../../components/account/account.component";
import {DashboardComponent} from "../../components/dashboard/dashboard.component";
import {
  ConfirmationPaiementListComponent
} from "../../components/confirmation-paiement-list/confirmation-paiement-list.component";

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.css'
})
export class ClientPageComponent implements OnInit, AfterViewInit{
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true  }) componentContainer!: ViewContainerRef;
  current!: any;

  constructor(private injector: Injector) {}
  ngOnInit() {}
  ngAfterViewInit() {
    this.loadComponent('create-client');
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
      case 'creanciers':
        componentType = CreanciersComponent;
        break;
      case 'creances':
        componentType = CreancesComponent;
        break;
      case 'form':
        componentType = FormulairePageComponent;
        break;
      case 'dashboard':
        componentType = DashboardComponent;
        break;
      case  'confirmapayment':
        componentType = ConfirmationPaiementListComponent;
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
