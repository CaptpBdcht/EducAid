import { Component, OnInit } from '@angular/core';

import { ClassService } from '../../../../core/services/class.service';
import { RouterHelperService } from '../../../../core/metadatas/router-helper.service';

import { IClass, ClassAdapter } from '../../../../shared/models/class';

@Component({
    selector: 'educaid-teacher-classes',
    templateUrl: 'teacher-classes.component.html'
})
export class TeacherClassesComponent implements OnInit {
  
  classes: IClass[];

  constructor(
    private classService: ClassService,
    private routerHelperService: RouterHelperService
  ) {}

  ngOnInit(): void {
    this.classService.findAllFormattedByTeacherId()
    .then((classes: IClass[]) => this.classes = classes as ClassAdapter[]);
  }

  selectClass(clazz: any): void {
    this.routerHelperService.goTo('/dashboard/teacher/myclasses/assign', clazz.classId);
  }
}
