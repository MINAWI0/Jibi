import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {SessionService} from "../utils/session/session.service"

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  solde: number = -1;
  currentRoute!: any;
  current!: any;
  navs!: any;
  constructor(private router: Router,private sessionService: SessionService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.current= event.url.split('/').at(1);
      }
      this.navs = [
        { name: 'Dashboard',icon: 'fa-light fa-gauge', activeIcon: 'fas fa-tachometer-alt', link: 'dashboard', visible:  this.current == 'client' },
        { name: 'Transactions', activeIcon: 'fas fa-exchange-alt',icon: 'fa-light fa-arrow-right-arrow-left', link: 'confirmapayment', visible:  this.current == 'client' },
        { name: 'Paiements et factures',icon: 'fa-light fa-file-invoice-dollar', activeIcon:'fas fa-file-invoice-dollar', link: 'invoice', visible: this.current == 'client' },
        { name: 'Creanciers', activeIcon: 'fas fa-users',icon:'fa-light fa-users', link: 'creanciers', visible: this.current == 'client' },
        { name: 'Recharge sold', activeIcon: 'fas fa-users',icon:'fa-light fa-users', link: 'rechargerSold', visible: this.current == 'client' },
        { name: 'Notifications',icon: 'fa-light fa-bell', activeIcon: 'fas fa-bell', link: '', visible: this.current == 'client' },
        { name: 'New Client',icon:'fa-light fa-user-plus', activeIcon: 'fas fa-user-plus', link: 'create-client', visible: this.current == 'agent' },
        { name: 'Clients List', activeIcon: 'fas fa-users',icon:'fa-light fa-users', link: 'agents-list', visible: this.current == 'agent' },
        { name: 'New Agent', icon: 'fa-light fa-user-tie',activeIcon: 'fas fa-user-tie', link: 'create-agent', visible: this.current == 'admin' },
        { name: 'Agents List', activeIcon: 'fas fa-users',icon:'fa-light fa-users', link: 'agents-list', visible: this.current == 'admin' }
      ];
    });
  }
  searchTerm: string = '';
  @Output() itemClicked: EventEmitter<string> = new EventEmitter<string>();
  @Input() currentContent!: any;

  ngOnInit() {
    this.itemClicked.emit(this.currentContent)
    this.solde = this.sessionService.getComptePayment().solde
  }

  selectComponent(componentName: string) {
    this.itemClicked.emit(componentName);
  }
  search() {
    // Add your search logic here
    console.log('Searching for:', this.searchTerm);
  }

  logout(){
    this.sessionService.clearSessionData()
    this.router.navigate(['/home']);
  }

  rechrgerSold() {

  }

}
