import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostsService } from 'src/app/services/api/posts/posts.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  @Input() post!: Post;

  constructor(
    private modalService: NgbModal,
    private postService: PostsService
  ) {}

  ngOnInit(): void {}

  openBackDropCustomClass(content: any) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openWindowCustomClass(content: any) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  onDelete(): void {
    this.modalService.dismissAll();
  }
}
