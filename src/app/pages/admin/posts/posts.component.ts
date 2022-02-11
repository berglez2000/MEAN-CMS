import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/Page';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  isLoading: boolean = true;
  posts: Page[] = [];

  constructor() {}

  ngOnInit(): void {}
}
