import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.verifyToken();

    this.authService.authStatusListener().subscribe((isAuth: boolean) => {
      this.isLoaded = isAuth;
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
