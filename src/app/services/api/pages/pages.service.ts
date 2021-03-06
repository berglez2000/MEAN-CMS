import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Page, PageObject } from 'src/app/models/Page';
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
export class PagesService {
  private apiUrl: string = 'http://localhost:5000/api/pages/';
  private token: any;
  private deletePageSubject = new Subject<any>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPages(): Observable<PageObject> {
    return this.http.get<PageObject>(this.apiUrl, httpOptions);
  }

  getPage(id: any): Observable<Page> {
    const url: string = this.apiUrl + id;
    return this.http.get<Page>(url);
  }

  createPage(page: Page): Observable<ServerResponse> {
    if (!this.token) {
      this.token = this.authService.getToken();
      const authString = `Bearer ${this.token}`;
      httpOptions.headers = httpOptions.headers.append(
        'Authorization',
        authString
      );
    }
    return this.http.post<ServerResponse>(this.apiUrl, page, httpOptions);
  }

  updatePage(page: Page): Observable<ServerResponse> {
    const url: string = this.apiUrl + page._id;
    console.log(url);
    if (!this.token) {
      this.token = this.authService.getToken();
      const authString = `Bearer ${this.token}`;
      httpOptions.headers = httpOptions.headers.append(
        'Authorization',
        authString
      );
    }
    return this.http.patch<ServerResponse>(url, page, httpOptions);
  }

  deletePage(id: any): Observable<ServerResponse> {
    const url: string = this.apiUrl + id;
    if (!this.token) {
      this.token = this.authService.getToken();
      const authString = `Bearer ${this.token}`;
      httpOptions.headers = httpOptions.headers.append(
        'Authorization',
        authString
      );
    }
    this.deletePageSubject.next(id);
    return this.http.delete<ServerResponse>(url, httpOptions);
  }

  onDeletePage(): Observable<any> {
    return this.deletePageSubject.asObservable();
  }

  stringToSlug(str: string): string {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();

    const from = '????????????????????????????????????????????????/_,:;';
    const to = 'aaaaaeeeeiiiioooouuuunc------';

    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    return str;
  }
}
