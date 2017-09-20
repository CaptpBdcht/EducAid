 import { Component,OnInit } from '@angular/core';
import { Message, SelectItem } from 'primeng/primeng';

import { LogLevel, LoggerService } from '../../core/logs/logger.service';
import { DocumentService } from '../../core/services/document.service';

import { ClassService } from '../../core/services/class.service';
import { CourseService } from '../../core/services/course.service';
import { CourseHasDocumentService } from '../../core/services/course-has-document.service';

import { IClass, ClassAdapter } from '../../shared/models/class';
// import { CourseHasDocument } from '../../shared/models/courseHasDocument';


@Component({
  selector: 'educaid-classes',
  templateUrl: 'upload-document.component.html'
})
export class UploadDocumentComponent implements OnInit {

  errorMessage= '';
  uploadPublicCourse: boolean = false;
  message: Message[] = [];
  warningmessage: Message[] = [];
  uploadedFiles: any[] = [];
  user: any;
  classes: SelectItem[] = new Array<SelectItem>();
  selectedClass: any;
  courses: any[];
  selectedCourse: any;
  courseName= '';
  searchCourseText= '';

  constructor(
    private classService: ClassService,
    private courseHasDocumentService: CourseHasDocumentService,
    private documentService: DocumentService,
    private courseService: CourseService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.loadClasses();
    this.logger.log({
      class: 'upload-DocumentComponent',
      method: 'onInit',
      message: JSON.stringify(this.user),
      level: LogLevel.Log
    });
  }

  protected loadClasses(){
    this.classService.findAllFormattedByUserId(this.user.id)
      .then((res: IClass[]) => {
        if (res.length === 0) {
          this.warningmessage.push
            ({severity: 'warn', summary: '  Données indisponibles', detail: 'Vous n\'êtes lié à aucune classe'});
        }
        res.forEach(classe => {
          this.classes.push(({ label: ClassAdapter.formatName(classe), value: classe }));
        });
      })
      .catch((errMsg: string) => this.errorMessage = errMsg.split(':')[1]);
      this.classes.push(({ label: 'Non-classé', value: 'Non-classé' }));
  }

  public checkPublic(event?: any){
    this.message = [];
    if (event.value === 'Non-classé'){
      this.uploadPublicCourse = false;
      this.selectedCourse = undefined;
      this.searchCourseText = '';
      this.message.push({
        severity: 'info',
        summary: '   Cette configuration va mettre en ligne vos documents publiquement', 
        detail: 'Tout le monde pourra voir vos documents sur Educaid, ils ne seront liés à aucun sujet.'
      });
    }
    if (event.checked === true){
      this.message.push({
        severity: 'info',
        summary: '   Cette configuration va mettre en ligne vos documents publiquement', 
        detail: 'Tout le monde pourra voir vos documents sur Educaid, ils seront liés au sujet suivant: '
              +this.courseName+'.'
      });
    }
  }

  protected uploadFiles(event?: any) {
    this.message = [];
    let isPublic = false;
    let uploadPath = ClassAdapter.formatName(this.selectedClass);
    if (this.uploadPublicCourse){
      isPublic = true;
    }
    if (this.selectedClass === 'Non-classé'){
      uploadPath = 'Non-classé';
      isPublic = true;
    }
    if (this.selectedClass !== 'Non-classé'){
      uploadPath += '/'+this.courseName;
    }
    const fileList: File[] = event.files;
    fileList.forEach(file => {
      this.documentService.upload(file, uploadPath)
      .then((res: boolean) => {
        this.documentService.create(file.name.replace(/\.[^/.]+$/, ''), 
          uploadPath.replace(/\s/g,'')+'/'+file.name, isPublic)
        .then((createdDocumentId: number) => {
          if (this.selectedClass !== 'Non-classé'){
            this.courseHasDocumentService.create(this.selectedCourse.courseId
            , createdDocumentId);
          }
          this.uploadedFiles.push(file);
          this.message.push({severity: 'success', summary: '  Fichier mis en ligne!', detail: ''});
        })
        .catch((errMsg: string) => {
          this.message.push({severity: 'error', summary: '  Mise en ligne ratée:', detail: errMsg});
        });
      })
      .catch((errMsg: string) => {
            this.message.push({severity: 'error', summary: '  Mise en ligne ratée', detail: errMsg});
      });
    });
  }

  public searchCourses(event?: any) {
    this.courseService.findAllFormattedByClassAndTeacherAndName(event.query, 
    this.selectedClass.id, this.user.id)
    .then(coursesReturned => {
      this.courses = coursesReturned;
    });
  }
  public onClearCourse(event?: any) {
    this.courseName = '';
    this.selectedCourse = undefined;
  }
  public onSelectCourse(event?: any){
    this.courseName = event.subject;
    this.selectedCourse = event;
  }

  protected onUpload(event?: any) {
    
  }
}
