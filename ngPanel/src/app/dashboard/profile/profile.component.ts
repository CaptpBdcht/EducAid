import { Component, OnInit } from '@angular/core';

import { Message } from 'primeng/primeng';

import { IUser } from '../../shared/models/user';
import { LogLevel, LoggerService } from '../../core/logs/logger.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'educaid-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {

  avatarSrc: string = '';
  newPasswordConfirm: string = '';
  newPassword: string = '';
  msgs: Message[] = [];
  user: IUser;

  constructor(
    private logger: LoggerService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initUser();
    this.initAvatar();
  }

  initUser(): void {
    this.userService.getStorageUser()
    .then((user: IUser) => {
      this.user = user;
      this.logUser();
    })
    .catch((errMsg: string) => console.error(errMsg));
  }

  initAvatar(): void {
    this.userService.getStorageAvatar().
    then((avatar: string) => this.avatarSrc = avatar)
    .catch((errMsg: string) => console.error(errMsg));
  }

  logUser(): void {
    // Logging the initialization
    this.logger.log({
      class: 'ProfileComponent',
      method: 'initAndLog',
      message: JSON.stringify(this.user),
      level: LogLevel.Log
    });
  }

  saveInformations() {
    this.userService.update(this.user)
    .then(response => {
      this.msgs.push({ severity: 'error', summary: 'Success', detail: 'Your informations has been correctly saved' });
    })
    .catch((errResponse: string) => {
      const errorMessage = errResponse.split(':')[1];

      this.msgs.push({ severity: 'error', summary: 'Error', detail: errorMessage });
    });
  }

  updatePassword() {
    this.userService.updatePassword(this.newPassword)
    .then((response) => {
      this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Your password has been correctly changed' });
    })
    .catch((errResponse: string) => {
      const errorMessage = errResponse.split(':')[1];

      this.msgs.push({ severity: 'error', summary: 'Error', detail: errorMessage });
    });
  }

  onSelect(event?: any) {
    console.warn(event.files[0].objectUrl);
  }

  uploadHandler(event?: any) {
    const avatar = event.files[0];

    this.userService.updateAvatar(avatar)
    .then((res) => {
      this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Your avatar has been changed' });
    })
    .catch((errResponse: string) => {
      const errorMessage = errResponse.split(':')[1];

      this.msgs.push({ severity: 'error', summary: 'Error', detail: errorMessage });
    })
    .then((res) => {
      return this.userService.setStorageAvatar(this.user.id);
    })
    .catch((res) => this.msgs.push({ severity: 'error', summary: 'Error', detail: 'An error occured' }))
    .then((res) => this.initAvatar());
  }

  onUpload(event?: any) {
    console.warn('Upload ended !');
  }
}
