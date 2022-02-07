import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { Page } from 'src/app/models/Page';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { AlertService } from 'src/app/services/alert/alert.service';
import { PagesService } from 'src/app/services/api/pages/pages.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  title: string = '';
  content: string = '';
  slug: string = '';
  isLoading: boolean = false;

  constructor(
    private alertService: AlertService,
    private pagesService: PagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  notFilledCorrectly(): void {
    const alert: Alert = {
      type: 'warning',
      text: 'Please fill the title',
      time: 2000,
    };
    this.alertService.addAlert(alert);
  }

  onSubmit(): void {
    if (!this.title) {
      this.notFilledCorrectly();
      return;
    }

    this.isLoading = true;

    this.slug = this.pagesService.stringToSlug(this.title);

    const page: Page = {
      title: this.title,
      content: this.content,
      slug: this.slug,
    };

    this.subscription = this.pagesService.createPage(page).subscribe(
      (res: ServerResponse) => {
        if (res.success) {
          this.isLoading = false;
          const alert: Alert = {
            type: 'success',
            text: 'Page added successfully',
            time: 1500,
          };
          this.alertService.addAlert(alert);

          setTimeout(() => {
            this.router.navigate(['/admin/pages']);
          }, alert.time);
        }
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        const alert: Alert = {
          type: 'danger',
          text: error.message,
          time: 2000,
        };
        this.alertService.addAlert(alert);
      }
    );

    this.title = '';
    this.content = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
