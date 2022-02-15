import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MediaService } from 'src/app/services/api/media/media.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Alert } from 'src/app/models/Alert';
import { PostsService } from 'src/app/services/api/posts/posts.service';
import { Post } from 'src/app/models/Post';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  title: string = '';
  postContent: string = '';
  isLoading: boolean = false;
  buttonDisabled: boolean = true;
  postImage: string = '';

  constructor(
    private modalService: NgbModal,
    private mediaService: MediaService,
    private alertService: AlertService,
    private postsService: PostsService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  validatePost(): boolean {
    let isValid: boolean = true;

    if(!this.title){
      const alert: Alert = {
        type: 'warning',
        text: 'Please fill in the post title',
        time: 2000
      }

      this.alertService.addAlert(alert);
      isValid = false;
    }

    return isValid;
  }

  createPost(): Post {
    const post: Post = {
      title: this.title,
      image: this.postImage,
      content: this.postContent
    }

    return post;
  }

  onSavePost(): void {
    const isValid: boolean = this.validatePost();
    if(!isValid) return;
    const post: Post = this.createPost();
    this.subscription = this.postsService.addPost(post).subscribe(res => {
      const alert: Alert = {
        type: 'success',
        text: 'Post added successfully',
        time: 2000
      }

      this.alertService.addAlert(alert);

      setTimeout(() => {
        this.router.navigate(['/admin/posts']);
      }, alert.time);
    }, error => {
      const alert: Alert = {
        type: 'danger',
        text: 'an error has occurred',
        time: 2000
      }

      this.alertService.addAlert(alert);
    });
  }

  onAddImage(): void {
    this.modalService.dismissAll();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
