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
        { name: 'Dashboard', icon: 'fas fa-tachometer-alt', link: 'dashboard', visible: this.current == 'admin' || this.current == 'client' },
        { name: 'Transactions', icon: 'fas fa-exchange-alt', link: 'confirmapayment', visible: this.current == 'admin' || this.current == 'client' },
        { name: 'Paiements et factures', icon: 'fas fa-file-invoice-dollar', link: 'invoice', visible: this.current == 'client' },
        { name: 'Creanciers', icon: 'fas fa-users', link: 'creanciers', visible: this.current == 'client' },
        { name: 'Recharge sold', icon: 'fas fa-users', link: 'rechargerSold', visible: this.current == 'client' },
        { name: 'Notifications', icon: 'fas fa-bell', link: '', visible: this.current == 'client' },
        { name: 'New Client', icon: 'fas fa-user-plus', link: 'create-client', visible: this.current == 'agent' },
        { name: 'New Agent', icon: 'fas fa-user-tie', link: 'create-agent', visible: this.current == 'admin' },
        { name: 'New Agency', icon: 'fas fa-building', link: 'create-client', visible: this.current == 'admin' }
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
