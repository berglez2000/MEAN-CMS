import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Alert } from 'src/app/models/Alert';
import { Image } from 'src/app/models/Image';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MediaService } from 'src/app/services/api/media/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  constructor(
    private mediaService: MediaService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const image: File = target.files[0];
      this.mediaService.uploadSingle(image).subscribe(
        (resImg: Image) => {
          this.mediaService.addImage(resImg);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) {
            const alert: Alert = {
              type: 'warning',
              text: 'Image already exists',
              time: 2000,
            };
            this.alertService.addAlert(alert);
          }
        }
      );
    }
  }
}
