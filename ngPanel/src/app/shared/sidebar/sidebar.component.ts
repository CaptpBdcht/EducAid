import { Component, OnInit  } from '@angular/core';

import { UserRole } from '../models/user';

import { AuthenticationService } from '../../core/metadatas/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'educaid-sidebar',
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {
    
    singleClicked: string | null;

    isStudentVisible: boolean;
    isTeacherVisible: boolean;
    isAdminVisible: boolean;
    
    constructor(private authService: AuthenticationService) {
        const userInfo = JSON.parse(this.authService.getUserInfo());

        this.isStudentVisible = userInfo.role === UserRole[UserRole.STUDENT];
        this.isTeacherVisible = userInfo.role === UserRole[UserRole.TEACHER];
        this.isAdminVisible = userInfo.role === UserRole[UserRole.ADMIN];
    }

    ngOnInit() {}

    sideNavClickSingle(clicked: string): void {
        this.singleClicked = (this.singleClicked === clicked) ? null : clicked;
    }
}
