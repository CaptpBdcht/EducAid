import { Component, OnInit } from '@angular/core';

// import { SelectItem } from 'primeng/primeng';

import { SubjectService } from '../../../core/services/subject.service';
import { ISubject, SubjectDTO } from '../../../shared/models/subject';

@Component({
    selector: 'educaid-subjects-admin',
    templateUrl: 'subjects-crud.component.html'
})
export class SubjectsCrudComponent implements OnInit {

  displayDialogSubject: boolean;

  subject: ISubject = new SubjectDTO();

  selectedSubject: ISubject;

  newSubject: boolean;

  subjects: ISubject[];

  constructor(
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.initSubjects();
  }

  initSubjects(): void {
    this.subjectService.findAll()
        .then((subjects: ISubject[]) => this.subjects = subjects)
        .then(() => console.warn(this.subjects));
  }

  showAddSubjectDialog(): void {
    this.newSubject = true;
    this.subject = new SubjectDTO();
    this.displayDialogSubject = true;
  }

  saveSubject() {
    const subjects = this.subjects ? [...this.subjects] : [];
    if (this.newSubject) {
      subjects.push(this.subject);
      this.subjectService.create(this.subject)
          .then(() => this.reinitSubjectDialog());
    }
    else {
      subjects[this.findSelectedSubjectIndex()] = this.subject;
      this.subjectService.update(this.subject)
          .then(() => this.reinitSubjectDialog());
    }
  }

  reinitSubjectDialog(): void {
    this.subject = null;
    this.selectedSubject = null;
    this.displayDialogSubject = false;
    this.initSubjects();
  }

  deleteSubject(): void {
    const index = this.findSelectedSubjectIndex();
    this.subjectService.delete(this.subjects[index].id);
    this.subjects = this.subjects.filter((val, i) => i !== index);
    this.subject = null;
    this.displayDialogSubject = false;
  }

  onRowSubjectSelect(event: any): void {
    this.newSubject = false;
    this.subject = this.cloneSubject(event.data);
    this.displayDialogSubject = true;
  }

  cloneSubject(data: any): ISubject {
    return new SubjectDTO(data.id, data.name);
  }

  findSelectedSubjectIndex(): number {
    return this.subjects.indexOf(this.selectedSubject);
  }
}
