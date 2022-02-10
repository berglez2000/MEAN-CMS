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
  isLoaded: boolean = false;

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.subscription = this.mediaService
      .getImages()
      .subscribe((images: Images) => {
        this.images = images.images;
        this.images.forEach((image) => (image.checked = false));
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
