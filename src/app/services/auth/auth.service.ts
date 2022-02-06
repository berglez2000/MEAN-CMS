import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ServerResponse } from 'src/app/models/ServerResponse';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuth: boolean = false;
  private token: any;
  private authSubject = new Subject<boolean>();
  private apiUrl: string = 'http://localhost:5000/api/users/';

  constructor(private http: HttpClient) {}

  verifyToken(): void {
    if (!this.token) {
      this.getToken();
      const authHeaders: string = `Bearer ${this.token}`;
      httpOptions.headers = httpOptions.headers.append(
        'Authorization',
        authHeaders
      );
    }
    this.http.get<ServerResponse>(this.apiUrl, httpOptions).subscribe(
      (res: ServerResponse) => {
        if (res.success) {
          this.isAuth = true;
        }
        this.authSubject.next(this.isAuth);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.isAuth = false;
          this.authSubject.next(this.isAuth);
        }
      }
    );
  }

  getIsAuth(): boolean {
    return this.isAuth;
  }

  changeAuth(isAuth: boolean): void {
    this.isAuth = isAuth;
    this.authSubject.next(this.isAuth);
  }

  authStatusListener(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  storeToken(token: any): void {
    localStorage.setItem('id_token', token);
  }

  getToken(): any {
    this.token = localStorage.getItem('id_token');
    return this.token;
  }
}
