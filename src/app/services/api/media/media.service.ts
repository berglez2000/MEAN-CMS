import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Image, Images } from 'src/app/models/Image';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { AuthService } from '../../auth/auth.service';

let httpOptions = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private token: any;
  private imageSubject = new Subject<Image>();
  private chooseImageSubject = new Subject<string>();
  private apiUrl: string = 'http://localhost:5000/api/media/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  uploadSingle(file: File): Observable<any> {
    const url: string = this.apiUrl + 'single';
    const formData = new FormData();
    formData.append('image', file, file.name);
    if (!this.token) {
      this.token = this.authService.getToken();
      const authHeaders: string = `Bearer ${this.token}`;
      httpOptions.headers = httpOptions.headers.append(
        'Authorization',
        authHeaders
      );
    }
    return this.http.post(url, formData, httpOptions);
  }

  deleteImage(id: any, filename: string): Observable<ServerResponse> {
    const url: string = `${this.apiUrl + id}/${filename}`;
    if (!this.token) {
      this.token = this.authService.getToken();
      const authHeaders: string = `Bearer ${this.token}`;
      httpOptions.headers = httpOptions.headers.append(
        'Authorization',
        authHeaders
      );
    }
    return this.http.delete<ServerResponse>(url, httpOptions);
  }

  addImage(image: Image): void {
    this.imageSubject.next(image);
  }

  onAddImage(): Observable<Image> {
    return this.imageSubject.asObservable();
  }

  getImages(): Observable<Images> {
    return this.http.get<Images>(this.apiUrl);
  }

  changeImage(imageUrl: string): void {
    this.chooseImageSubject.next(imageUrl);
  }

  onChangeImage(): Observable<string> {
    return this.chooseImageSubject.asObservable();
  }
}
