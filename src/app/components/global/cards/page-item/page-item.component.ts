import { Component, Input, OnInit } from '@angular/core';
import { Page } from 'src/app/models/Page';

@Component({
  selector: 'app-page-item',
  templateUrl: './page-item.component.html',
  styleUrls: ['./page-item.component.scss'],
})
export class PageItemComponent implements OnInit {
  @Input() page!: Page;

  constructor() {}

  ngOnInit(): void {}
}
