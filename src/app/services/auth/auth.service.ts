import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuth: boolean = false;
  private authSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  verifyToken() {}

  getIsAuth(): boolean {
    return this.isAuth;
  }

  authStatusListener(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  storeToken(token: any): void {
    localStorage.setItem('id_token', token);
  }

  getToken(): any {
    const token: any = localStorage.getItem('id_token');
    return token;
  }
}
