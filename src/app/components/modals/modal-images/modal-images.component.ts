import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Image, Images } from 'src/app/models/Image';
import { MediaService } from 'src/app/services/api/media/media.service';

@Component({
  selector: 'app-modal-images',
  templateUrl: './modal-images.component.html',
  styleUrls: ['./modal-images.component.scss'],
})
export class ModalImagesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  images: Image[] = [];
  currentImageUrl: string = '';
  isLoaded: boolean = false;

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.subscription = this.mediaService
      .getImages()
      .subscribe((images: Images) => {
        this.images = images.images;
        this.currentImageUrl = this.mediaService.getImageUrl();
        this.images.forEach((image) => {
          if(image.url === this.currentImageUrl){
            image.checked = true;
          } else {
            image.checked = false;
          }
        });

        this.isLoaded = true;
      });
  }

  onClick(image: Image): void {
    const images: Image[] = this.images.filter(
      (img: Image) => img._id !== image._id
    );
    images.forEach((img) => (img.checked = false));

    image.checked = !image.checked;
    const imageUrl: string = image.checked ? image.url : '';
    this.mediaService.changeImage(imageUrl);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
