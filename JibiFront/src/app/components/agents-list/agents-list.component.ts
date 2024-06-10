import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ClientDto} from "../../entities/client-dto";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ClientService} from "../../services/client/client.service";


@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrl: './agents-list.component.css'
})
export class AgentsListComponent implements OnInit {
  clients = new MatTableDataSource<ClientDto>([]);
  clients$: ClientDto[] = [];
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.getAgentClients()
  }

  getAgentClients(){
    this.clientService.getAgentClients().subscribe(clients => {
      this.clients = new MatTableDataSource(clients);
      this.clients.sort = this.sort;
      this.clients.paginator = this.paginator;
    })
  }
}
