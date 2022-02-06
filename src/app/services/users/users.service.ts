import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string = 'http://localhost:5000/api/users/';

  constructor(private http: HttpClient) {}

  createUser(username: string, password: string): User {
    const user: User = {
      username: username,
      password: password,
    };

    return user;
  }

  login(user: User): Observable<ServerResponse> {
    const url: string = this.apiUrl + 'login';
    return this.http.post<ServerResponse>(url, user);
  }
}
