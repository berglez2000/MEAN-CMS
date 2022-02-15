import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { AuthService } from '../../auth/auth.service';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl: string = 'http://localhost:5000/api/posts/';
  token: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  addPost(post: Post): Observable<Post> {
    if(!this.token){
      this.token = this.authService.getToken();
      const bearer: string = `Bearer ${this.token}`;
      httpOptions.headers = httpOptions.headers.append('Authorization', bearer);
    }
    return this.http.post<Post>(this.apiUrl, post, httpOptions);
  }
}
