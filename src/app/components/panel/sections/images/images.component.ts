import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Image, Images } from 'src/app/models/Image';
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

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.subscription = this.mediaService
      .getImages()
      .subscribe((images: Images) => {
        this.images = images.images;
        this.images.forEach((image) => (image.checked = false));
        this.isLoaded = true;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
