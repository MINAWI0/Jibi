import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {SessionService} from "../utils/session/session.service"

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  menuVisible: boolean = false;
  currentRoute!: any;
  current!: any;
  navs!: any;
  constructor(private router: Router,private sessionService: SessionService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.current= event.url.split('/').at(1);
      }
      this.navs =[
        {name: 'Dashboard',image: 'assets/imgs/icons/dash.png',link:'qr-account',visible: this.current=='admin' || this.current=='client' },
        {name: 'Transactions',image: 'assets/imgs/icons/img_2.png',link:'',visible: this.current=='admin' || this.current=='client' },
        {name: 'Paiements et factures',image: 'assets/imgs/icons/payments.svg',link:'invoice',visible: this.current=='client'},
        {name: 'Notifications',image: 'assets/imgs/icons/notifs.svg',link:'',visible: this.current=='client'},
        {name: 'Creanciers',image: 'assets/imgs/icons/wallet.png',link:'creanciers',visible: this.current=='client'},
        {name: 'History',image: 'assets/imgs/icons/transaction-history.png',link:'creanciers',visible: this.current=='client'},
        {name: 'New Client',image: 'assets/imgs/icons/img_5.png',link:'create-client',visible: this.current=='agent'},
        {name: 'Client List',image: 'assets/imgs/icons/img_5.png',link:'client-list',visible: this.current=='agent'},
        {name: 'New Agent',image: 'assets/imgs/icons/img_7.png',link:'create-agent',visible: this.current=='admin'},
        {name: 'New Agency',image: 'assets/imgs/icons/img_8.png',link:'create-client',visible: this.current=='admin'}
      ]
    });
  }
  searchTerm: string = '';
  @Output() itemClicked: EventEmitter<string> = new EventEmitter<string>();
  @Input() currentContent!: any;

  ngOnInit() {
    this.itemClicked.emit(this.currentContent)
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
}
