import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/Alert';
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

  onSubmit(): void {
    if (!this.username || !this.password) {
      const alert: Alert = this.alertService.createAlert(
        'warning',
        'please fill in the username and password',
        2000
      );
      this.alertService.addAlert(alert);
      return;
    }
  }
}
