import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { Page } from 'src/app/models/Page';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { AlertService } from 'src/app/services/alert/alert.service';
import { PagesService } from 'src/app/services/api/pages/pages.service';

@Component({
  selector: 'app-page-item',
  templateUrl: './page-item.component.html',
  styleUrls: ['./page-item.component.scss'],
})
export class PageItemComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @Input() page!: Page;

  constructor(
    private modalService: NgbModal,
    private pagesService: PagesService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  openBackDropCustomClass(content: any) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openWindowCustomClass(content: any) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  onDelete(): void {
    this.subscription = this.pagesService
      .deletePage(this.page._id)
      .subscribe((res: ServerResponse) => {
        if (res.success) {
          const alert: Alert = {
            type: 'success',
            text: 'Page deleted successfully',
            time: 2000,
          };
          this.alertService.addAlert(alert);
        }
      });
    this.modalService.dismissAll();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
