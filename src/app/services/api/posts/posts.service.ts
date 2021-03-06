import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { AuthService } from '../../auth/auth.service';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl: string = 'http://localhost:5000/api/posts/';
  private postSubject = new Subject<any>();
  token: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPost(id: any): Observable<Post> {
    const url: string = this.apiUrl + id;
    return this.http.get<Post>(url);
  }

  addPost(post: Post): Observable<Post> {
    if (!this.token) {
      this.token = this.authService.getToken();
      const bearer: string = `Bearer ${this.token}`;
      httpOptions.headers = httpOptions.headers.append('Authorization', bearer);
    }
    return this.http.post<Post>(this.apiUrl, post, httpOptions);
  }

  deletePost(id: string): Observable<ServerResponse> {
    const url: string = this.apiUrl + id;
    if (!this.token) {
      this.token = this.authService.getToken();
      const bearer: string = `Bearer ${this.token}`;
      httpOptions.headers = httpOptions.headers.append('Authorization', bearer);
    }
    this.postSubject.next(id);
    return this.http.delete<ServerResponse>(url, httpOptions);
  }

  updatePost(id: string, post: Post): Observable<ServerResponse> {
    const url: string = this.apiUrl + id;
    if (!this.token) {
      this.token = this.authService.getToken();
      const authString = `Bearer ${this.token}`;
      httpOptions.headers = httpOptions.headers.append(
        'Authorization',
        authString
      );
    }
    return this.http.patch<ServerResponse>(url, post, httpOptions);
  }

  onDeletePost(): Observable<any> {
    return this.postSubject.asObservable();
  }
}
