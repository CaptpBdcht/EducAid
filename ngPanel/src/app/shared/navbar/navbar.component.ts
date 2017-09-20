import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../core/metadatas/authentication.service';
import { LevelService } from '../../core/services/level.service';
import { StudentService } from '../../core/services/student.service';

import { IStudent, StudentAdapter } from '../../shared/models/user';
import { LevelGrade } from '../../shared/models/level';
import { UserRole } from '../../shared/models/user';


@Component({
  moduleId: module.id,
  selector: 'educaid-navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {

  userFirstname: string;

  isProfileVisible: boolean;
  isMyPictureVisible: boolean;

  constructor(
    private authService: AuthenticationService,
    private levelService: LevelService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.userFirstname = userInfo.firstname;

    if (userInfo.role === UserRole[UserRole.STUDENT]) {
      this.studentService.findLastByUserId(userInfo.id)
      .then((students: IStudent[]) => {
        const student = students[0] as StudentAdapter;
        const grade = this.levelService.getGradeByLevelName(student.levelName);

        if (grade === LevelGrade[LevelGrade.FIRST]) {
          this.isProfileVisible = false;
          this.isMyPictureVisible = true;
        } else {
          this.isProfileVisible = true;
          this.isMyPictureVisible = false;
        }
      })
      .catch((error: string) => console.error(error));
    } else {
      this.isProfileVisible = true;
      this.isMyPictureVisible = false;
    }
  }

  logout(): void { this.authService.signOut(); }
}
