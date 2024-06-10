import {AfterViewInit, Component, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {CreateAgentComponent} from "../../components/create-agent/create-agent.component";
import {CreateClientComponent} from "../../components/create-client/create-client.component";
import {AgentsListComponent} from "../../components/agents-list/agents-list.component";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent implements OnInit, AfterViewInit{

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
      case 'create-agent':
        componentType = CreateAgentComponent;
        break;
      case 'agents-list':
        componentType = AgentsListComponent;
        break;
    }
    if (componentType) {
      this.componentContainer?.createComponent(componentType);
    }
  }
}
