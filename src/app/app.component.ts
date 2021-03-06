import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cms-app';
  isAuth!: boolean;
  isLoaded: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.verifyToken();

    this.authService.authStatusListener().subscribe((isAuth: boolean) => {
      this.isAuth = isAuth;
      this.isLoaded = true;

      if (!this.isAuth) {
        this.router.navigate(['/admin/login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
