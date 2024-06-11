import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../components/utils/dialog/dialog.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private dialog: DialogService) {
  }

  ngOnInit() {

  }

}
