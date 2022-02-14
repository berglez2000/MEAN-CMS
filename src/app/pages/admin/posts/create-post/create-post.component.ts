import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MediaService } from 'src/app/services/api/media/media.service';

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
    private mediaService: MediaService
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

  onSubmit(): void {}

  onAddImage(): void {
    this.modalService.dismissAll();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
