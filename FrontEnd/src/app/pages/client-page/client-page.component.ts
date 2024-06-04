import {AfterViewInit, Component, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {CreateClientComponent} from "../../components/create-client/create-client.component";
import {InvoiceComponent} from "../../components/invoice/invoice.component";

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.css'
})
export class ClientPageComponent implements OnInit, AfterViewInit{
  @ViewChild('componentContainer', { read: ViewContainerRef }) componentContainer!: ViewContainerRef;
  current!: any;

  constructor() {}
  ngOnInit() {}
  ngAfterViewInit() {
    this.loadComponent('create-client');
  }

  loadComponent(componentName: string) {
    if(this.componentContainer)
      this.componentContainer.clear();
    let componentType: Type<any> | undefined;
    this.current = componentName
    switch (componentName) {
      case 'invoice':
        componentType = InvoiceComponent;
        break;
      case 'create-client':
        componentType = CreateClientComponent;
        break;
    }
    if (componentType) {
      this.componentContainer?.createComponent(componentType);
    }
  }
}
