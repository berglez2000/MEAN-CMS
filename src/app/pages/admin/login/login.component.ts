import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/Alert';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { User } from 'src/app/models/User';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private alertService: AlertService,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}

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

    const user: User = this.usersService.createUser(
      this.username,
      this.password
    );

    this.usersService.login(user).subscribe(
      (res: ServerResponse) => {
        if (res.success) {
          const alert: Alert = this.alertService.createAlert(
            'success',
            'Login succesful',
            2000
          );
          this.alertService.addAlert(alert);

          this.authService.storeToken(res.jwt);
          this.authService.changeAuth(true);
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 2000);
        }
      },
      (error) => {
        const alert: Alert = this.alertService.createAlert(
          'danger',
          'Wrong password',
          2000
        );
        this.alertService.addAlert(alert);
      }
    );

    this.username = '';
    this.password = '';
  }
}
