import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { Post } from 'src/app/models/Post';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MediaService } from 'src/app/services/api/media/media.service';
import { PostsService } from 'src/app/services/api/posts/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  id: any;
  title: string = '';
  postImage: string = '';
  postContent: string = '';
  buttonDisabled: boolean = true;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private mediaService: MediaService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.postsService
      .getPost(this.id)
      .subscribe((post: Post) => {
        console.log(post);
        this.title = post.title;
        this.postContent = post.content;
        this.postImage = post.image;
        if (this.postImage) {
          this.mediaService.changeImage(this.postImage);
        }
      });

    this.subscription = this.mediaService
      .onChangeImage()
      .subscribe((imageUrl: string) => {
        this.buttonDisabled = imageUrl ? false : true;
        this.postImage = imageUrl;
      });
  }

  openBackDropCustomClass(content: any) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openWindowCustomClass(content: any) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  onAddImage(): void {
    this.modalService.dismissAll();
  }

  validatePost(): boolean {
    let isValid: boolean = true;

    if (!this.title) {
      const alert: Alert = {
        type: 'warning',
        text: 'Please fill in the post title',
        time: 2000,
      };

      this.alertService.addAlert(alert);
      isValid = false;
    }

    return isValid;
  }

  createPost(): Post {
    const post: Post = {
      title: this.title,
      image: this.postImage,
      content: this.postContent,
    };

    return post;
  }

  onSavePost(): void {
    const isValid: boolean = this.validatePost();
    if (!isValid) return;
    const post: Post = this.createPost();
    this.subscription = this.postsService.updatePost(this.id, post).subscribe(
      (res: ServerResponse) => {
        if (res.success) {
          const alert: Alert = {
            type: 'success',
            text: 'Post updated successfully',
            time: 2000,
          };
          this.alertService.addAlert(alert);
          setTimeout(() => {
            this.router.navigate(['/admin/posts']);
          }, alert.time);
        }
      },
      (error: HttpErrorResponse) => {
        let alert: Alert = {
          type: 'danger',
          text: '',
          time: 2000,
        };
        if (error.status === 401) {
          alert.text = 'Not authorized';
        } else if (error.status === 404) {
          alert.text = 'Not found';
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
