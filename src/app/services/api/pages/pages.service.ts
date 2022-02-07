import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageObject } from 'src/app/models/Page';

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

  constructor(private http: HttpClient) {}

  getPages(): Observable<PageObject> {
    return this.http.get<PageObject>(this.apiUrl, httpOptions);
  }
}
