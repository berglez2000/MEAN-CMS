import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from 'src/app/models/Alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new Subject<Alert>();

  constructor() {}

  createAlert(type: string, text: string, time: number): Alert {
    const alert: Alert = {
      type: type,
      text: text,
      time: time,
    };
    return alert;
  }

  addAlert(alert: Alert): void {
    this.alertSubject.next(alert);
  }

  onAddAlert(): Observable<Alert> {
    return this.alertSubject.asObservable();
  }
}
