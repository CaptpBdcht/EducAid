import { Component, OnInit } from '@angular/core';

import { SelectItem } from 'primeng/primeng';

import { UserService } from '../../../core/services/user.service';
import { IUser, UserDTO, UserRole } from '../../../shared/models/user';

@Component({
    selector: 'educaid-user-admin',
    templateUrl: 'users-crud.component.html'
})
export class UsersCrudComponent implements OnInit {

  displayDialog: boolean;

  user: IUser = new UserDTO();
  
  selectedUser: IUser;

  newUser: boolean;

  users: IUser[];

  roles: SelectItem[];

  selectedRole: string;

  constructor(private userService: UserService) {
    this.roles = [];
    this.roles.push({ label: 'User', value: UserRole[UserRole.USER] });
    this.roles.push({ label: 'Student', value: UserRole[UserRole.STUDENT] });
    this.roles.push({ label: 'Teacher', value: UserRole[UserRole.TEACHER] });
    this.roles.push({ label: 'Admin', value: UserRole[UserRole.ADMIN] });
  }

  ngOnInit(): void {
    this.userService.findAll().then((users: IUser[]) => this.users = users);
  }

  showAddUserDialog(): void {
    this.newUser = true;
    this.user = new UserDTO();
    this.displayDialog = true;
  }

  save(): void {
    const users = this.users ? [...this.users] : [];

    // Add
    if (this.newUser) {
      users.push(this.user);
      this.userService.create(this.user)
          .then(() => this.reinitUserDialog());
    }
    // Update
    else {
      users[this.findSelectedUserIndex()] = this.user;
      this.userService.update(this.user)
          .then(() => this.reinitUserDialog());
    }
  }

  reinitUserDialog(): void {
    this.user = null;
    this.selectedUser = null;
    this.displayDialog = false;
    this.ngOnInit();
  }

  delete(): void {
    const index = this.findSelectedUserIndex();
    this.userService.delete(this.users[index].id);
    this.users = this.users.filter((val, i) => i !== index);
    this.user = null;
    this.displayDialog = false;
  }

  onRowSelect(event: any): void {
    this.newUser = false;
    this.user = this.cloneUser(event.data);
    this.displayDialog = true;
  }

  cloneUser(data: any): IUser {
    return new UserDTO(
      data.id, data.username,
      data.firstname, data.lastname, data.role,
      data.created, data.modified,
      data.activated, data.locked
    );
  }

  findSelectedUserIndex(): number {
    return this.users.indexOf(this.selectedUser);
  }
}
