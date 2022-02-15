import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { Post } from 'src/app/models/Post';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { AlertService } from 'src/app/services/alert/alert.service';
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
    private postService: PostsService,
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
    this.modalService.dismissAll();

    this.subscription = this.postService.deletePost(this.post._id).subscribe(
      (res: ServerResponse) => {
        if (res.success) {
          const alert: Alert = {
            type: 'success',
            text: 'Post deleted successfully',
            time: 2000,
          };
          this.alertService.addAlert(alert);
        }
      },
      (error: HttpErrorResponse) => {
        let alert: Alert = {
          type: 'danger',
          time: 2000,
          text: '',
        };
        if (error.status === 401) {
          alert.text = 'Not auhtorized. Please login';
        } else if (error.status === 404) {
          alert.text = 'Post not found';
        }
        this.alertService.addAlert(alert);
      }
    );
  }
}
