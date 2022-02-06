import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  type: string = '';
  text: string = '';
  showAlert: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.subscription = this.alertService
      .onAddAlert()
      .subscribe((alert: Alert) => {
        this.text = alert.text;
        this.type = alert.type;
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
          this.type = '';
          this.text = '';
        }, alert.time);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
