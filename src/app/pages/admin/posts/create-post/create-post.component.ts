import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  title: string = '';
  content: string = '';
  isLoading: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {}
}
