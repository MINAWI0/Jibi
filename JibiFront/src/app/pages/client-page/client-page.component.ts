import {AfterViewInit, Component, Input, OnInit,Injector, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {CreateClientComponent} from "../../components/create-client/create-client.component";
import {InvoiceComponent} from "../../components/invoice/invoice.component";
import {ClientsListComponent} from "../../components/clients-list/clients-list.component";
import {CreanciersComponent} from "../../components/creanciers/creanciers.component";
import {CreancesComponent} from "../../components/formss/creances.component";
import {CreanceDto} from "../../entities/creance-dto";
import {FormulairePageComponent} from "../../components/formss/formulaire-page/formulaire-page.component";
import {AccountComponent} from "../../components/account/account.component";

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.css'
})
export class ClientPageComponent implements OnInit, AfterViewInit{
  @ViewChild('componentContainer', { read: ViewContainerRef , static: true}) componentContainer!: ViewContainerRef;

  current!: any;

  constructor(private injector: Injector) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.loadComponent('qr-account');
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
      case 'qr-account':
        componentType = AccountComponent;
        break;
      case 'form':
        componentType = FormulairePageComponent;
        break;
    }

    if (componentType) {
      const componentRef = this.componentContainer.createComponent(componentType, { injector: this.injector });
      if (data) {
        componentRef.instance.data = data;
        console.log(data)
      }
    }
  }
}
