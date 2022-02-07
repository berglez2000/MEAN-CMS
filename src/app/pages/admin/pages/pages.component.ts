import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Page, PageObject } from 'src/app/models/Page';
import { PagesService } from 'src/app/services/api/pages/pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit, OnDestroy {
  pages: Page[] = [];
  isLoading: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(private pagesService: PagesService) {}

  ngOnInit(): void {
    this.subscription = this.pagesService
      .getPages()
      .subscribe((pages: PageObject) => {
        this.pages = pages.pages;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
