import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuth: boolean = false;

  constructor() {}

  getIsAuth(): boolean {
    return this.isAuth;
  }

  storeToken(token: any): void {
    localStorage.setItem('id_token', token);
  }
}
