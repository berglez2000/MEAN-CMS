import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { Page } from 'src/app/models/Page';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { AlertService } from 'src/app/services/alert/alert.service';
import { PagesService } from 'src/app/services/api/pages/pages.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  title: string = '';
  content: string = '';
  isLoading: boolean = false;
  pageLoaded: boolean = false;
  pageId: any;

  constructor(
    private pagesService: PagesService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pageId = this.route.snapshot.paramMap.get('id');
    this.subscription = this.pagesService
      .getPage(this.pageId)
      .subscribe((page: Page) => {
        this.title = page.title;
        this.content = page.content;
        this.pageLoaded = true;
      });
  }

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

    const page: Page = {
      _id: this.pageId,
      title: this.title,
      content: this.content,
      slug: this.pagesService.stringToSlug(this.title),
    };

    this.subscription = this.pagesService.updatePage(page).subscribe(
      (res: ServerResponse) => {
        if (res.success) {
          this.isLoading = false;
          const alert: Alert = {
            type: 'success',
            text: 'Page updated successfully',
            time: 1500,
          };
          this.alertService.addAlert(alert);

          setTimeout(() => {
            this.router.navigate(['/admin/pages']);
          }, alert.time);
        }
      },
      (error) => {
        this.isLoading = false;
        const alert: Alert = {
          type: 'danger',
          text: error.message,
          time: 2000,
        };
        this.alertService.addAlert(alert);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
