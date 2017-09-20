import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/services/user.service';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'educaid-my-picture',
  templateUrl: 'my-picture.component.html'
})
export class MyPictureComponent implements OnInit {

  currentPicture: string;
  images: any[];
  msgs: Message[] = [];
  numberOfPictures = 2;
  selectedPicture: string;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.images = [];
    this.currentPicture = localStorage.getItem('kidPicture');

    for (let i = 1; i <= this.numberOfPictures; i++) {
      this.images.push({
        source: './assets/img/avatar/' + i + '.png',
        alt: 'Image' + i,
        title: 'Image ' + i
      });
    }

    this.selectedPicture = this.images[0].source;
  }

  selectPicture(event?: any): void {
    this.selectedPicture = event.image.source;
  }

  updateKidPicture(): void {
    this.userService.updateKidPicture(this.selectedPicture)
    .then((res) => {
      this.currentPicture = this.selectedPicture;
      localStorage.setItem('kidPicture', this.selectedPicture);
      this.msgs.push({ severity: 'success', summary: 'Bravo !', detail: 'Tu as changé ton image !' });
    })
    .catch((errResponse: string) => {
      const errorMessage = errResponse.split(':')[1];

      this.msgs.push({ severity: 'error', summary: 'Error', detail: errorMessage });
    });
  }
}
