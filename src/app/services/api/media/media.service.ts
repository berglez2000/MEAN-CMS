import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

let httpOptions = {
  headers: new HttpHeaders({}),
};

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private apiUrl: string = 'http://localhost:5000/api/media/';

  constructor(private http: HttpClient) {}

  uploadSingle(file: File): Observable<any> {
    const url: string = this.apiUrl + 'single';
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post(url, formData);
  }
}
