import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/Alert';
import { Page } from 'src/app/models/Page';
import { AlertService } from 'src/app/services/alert/alert.service';
import { PagesService } from 'src/app/services/api/pages/pages.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  title: string = '';
  content: string = '';
  slug: string = '';

  constructor(
    private alertService: AlertService,
    private pagesService: PagesService
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

    this.slug = this.pagesService.stringToSlug(this.title);

    const page: Page = {
      title: this.title,
      content: this.content,
      slug: this.slug,
    };

    this.title = '';
    this.content = '';
  }
}
