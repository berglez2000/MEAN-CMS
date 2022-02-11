import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { Image, Images } from 'src/app/models/Image';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MediaService } from 'src/app/services/api/media/media.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  images: Image[] = [];
  checkedImages: Image[] = [];
  showDeleteImageButton: boolean = false;
  pluralImages: boolean = false;
  isLoaded: boolean = false;

  constructor(
    private mediaService: MediaService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.subscription = this.mediaService
      .getImages()
      .subscribe((images: Images) => {
        this.images = images.images;
        this.images.forEach((image) => (image.checked = false));
        this.isLoaded = true;
      });

    this.subscription = this.mediaService
      .onAddImage()
      .subscribe((image: Image) => {
        image.checked = false;
        this.images.push(image);
      });
  }

  onClick(image: Image) {
    image.checked = !image.checked;
    this.checkedImages = this.images.filter((image) => image.checked);

    if (this.checkedImages.length > 0) {
      this.showDeleteImageButton = true;

      if (this.checkedImages.length > 1) {
        this.pluralImages = true;
      } else {
        this.pluralImages = false;
      }
      return;
    }

    this.showDeleteImageButton = false;
    this.pluralImages = false;
  }

  onDelete(): void {
    const isPlural: boolean = this.checkedImages.length >= 2;
    this.checkedImages.forEach((image) => {
      this.mediaService
        .deleteImage(image._id, image.filename)
        .subscribe((res: ServerResponse) => {
          if (res.success) {
            this.images = this.images.filter((img) => img._id !== image._id);
            const alert: Alert = {
              type: 'success',
              text: `Image${isPlural ? 's' : ''} deleted successfully`,
              time: 1500,
            };

            this.alertService.addAlert(alert);
          }
        });
    });

    this.checkedImages = [];
    this.showDeleteImageButton = false;
    this.pluralImages = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
