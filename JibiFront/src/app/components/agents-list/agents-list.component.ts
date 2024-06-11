import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface DataItem {
  Nom: string;
  Prenom: string;
  UserName: string;
  ClientType: string;
  Action: number;
}

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.css']
})
export class AgentsListComponent implements OnInit {

  filterForm: FormGroup;
  data: DataItem[] = [
    { Nom: '2017-09-29 01:22', Prenom: '200398', UserName: 'iPhone X 64Gb Grey', ClientType: '$999.00', Action: 1 },
    { Nom: '2017-09-28 05:57', Prenom: '200397', UserName: 'Samsung S8 Black', ClientType: '$756.00', Action: 1 },
    // ... (rest of the data)
  ];
  filteredData: DataItem[] = [...this.data];
  search: string='';

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      Nom: [''],
      Prenom: [''],
      UserName: [''],
      ClientType: [''],
      Action: ['']
    });
  }

  ngOnInit() { }

  applyFilter() {
    let filterValue = this.search.trim().toLowerCase(); // Remove whitespace and convert to lowercase
    this.filteredData = this.data.filter(item => {
      return Object.values(item).some(val => val.toString().toLowerCase().includes(filterValue));
    });
  }
}
