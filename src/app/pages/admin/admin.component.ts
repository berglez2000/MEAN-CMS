import { Component, OnInit } from '@angular/core';
import { faHome, faColumns } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  faHome = faHome;
  faColumns = faColumns;

  constructor() {}

  ngOnInit(): void {}
}
