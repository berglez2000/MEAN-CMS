import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {}

  onSubmit(): void {}
}
