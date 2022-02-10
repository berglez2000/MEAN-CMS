import { Component, OnInit, EventEmitter } from '@angular/core';
import { Image } from 'src/app/models/Image';
import { MediaService } from 'src/app/services/api/media/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {}

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const image: File = target.files[0];
      this.mediaService.uploadSingle(image).subscribe((resImg: Image) => {
        this.mediaService.addImage(resImg);
      });
    }
  }
}
