import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Page } from 'src/app/models/Page';
import { PagesService } from 'src/app/services/api/pages/pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit, OnDestroy {
  pages: Page[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private pagesService: PagesService) {}

  ngOnInit(): void {
    this.subscription = this.pagesService
      .getPages()
      .subscribe((pages: Page[]) => {
        this.pages = pages;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
