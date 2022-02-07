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

  stringToSlug(str: string): string {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();

    const from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
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
