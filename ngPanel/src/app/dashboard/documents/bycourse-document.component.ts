import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TreeNode, Message } from 'primeng/primeng';

import { LogLevel, LoggerService } from '../../core/logs/logger.service';
import { CourseService } from '../../core/services/course.service';
import { DocumentService } from '../../core/services/document.service';
// import { SubjectService } from '../../core/services/subject.service';
import { ClassService } from '../../core/services/class.service';
/*import { SpecialtyService } from '../../core/services/specialty.service';
import { LevelService } from '../../core/services/level.service';*/

import { IClass, ClassAdapter } from '../../shared/models/class';
/*import { ISpecialty } from '../../shared/models/specialty';
import { ILevel } from '../../shared/models/level';*/
import { ICourse } from '../../shared/models/course';
// import { ISubject } from '../../shared/models/subject';
import { Document } from '../../shared/models/document';
import { TreeNodeObj } from '../../shared/models/UI/treeNodeObj';

@Component({
  selector: 'educaid-classes',
  templateUrl: 'bycourse-document.component.html'
})
export class ByCourseDocumentComponent implements OnInit {

  user: any;
  errorMessage = '';
  warningmessage: Message[] = [];
  
  privateDocumentsTree: TreeNode[];
  publicDocumentsTree: TreeNode[];
  selectedFile: TreeNode;

  publicDocumentNode = new Array<TreeNodeObj>();
  privateDocumentNode = new Array<TreeNodeObj>();
  classes = new Array<IClass>();

  constructor(
    private courseService: CourseService,
    private documentService: DocumentService,
    private classService: ClassService,
    private logger: LoggerService
  ) {}

  protected loadClasses(){
    this.classService.findAllFormattedByUserId(this.user.id)
      .then((res: IClass[]) => {
        if (res.length === 0) {
          this.warningmessage.push
            ({severity: 'warn', summary: '  Données indisponibles', detail: 'Vous n\'êtes lié à aucun cours'});
        }
        res.forEach(classe => {
          this.classes.push(classe);
          if (this.classes.length === res.length){
            this.classes.sort(function (a,b){
              return a.id-b.id;
            });
            this.loadFirstClassCourses();
          }
        });
      })
      .catch((errMsg: string) => this.errorMessage = errMsg.split(':')[1]);
  }

  protected loadFirstClassCourses(){
    this.courseService.findAllFormattedByClassId(this.classes[0].id)
      .then((resp: ICourse[]) => {
        if (resp.length > 0){
          this.loadPrivateCourse(resp);
        }
      })
      .catch((errMsg: string) => this.errorMessage = errMsg.split(':')[1]);
  }

  public openDocument(event?: any) {
    window.open(environment.apiUrl+'/'+event.node.data);
  }

  public onTabChange(event?: any){
    this.courseService.findAllFormattedByClassId(this.classes[event.index].id)
      .then((res: ICourse[]) => {
        if (res.length > 0){
          this.loadPrivateCourse(res);
        }
      })
      .catch((errMsg: string) => this.errorMessage = errMsg.split(':')[1]);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.loadClasses();
    this.logger.log({
      class: 'bycourse-documentComponent',
      method: 'onInit',
      message: JSON.stringify(this.user.id),
      level: LogLevel.Log
    });
  }

  protected loadPrivateCourse(courses: ICourse[]) {
    this.privateDocumentNode = new Array<TreeNodeObj>();
    courses.forEach(course => {
      if (this.user.role === 'USER' || this.user.role === 'STUDENT') {
        this.loadPrivateSubject(course);
      }
      if (this.user.role === 'TEACHER') {
          if (course.teacherId === this.user.id) {
              this.loadPrivateSubject(course);
          }
      }
    });
  }

  public sortPrivateDocumentsTree(): TreeNode[]{
    if (this.privateDocumentsTree != null){
      JSON.stringify(this.privateDocumentsTree);
      this.privateDocumentsTree.sort(function(a, b){
        const nameA = a.label.toLowerCase(), nameB = b.label.toLowerCase();
        if (nameA < nameB)
          return -1;
        if (nameA > nameB)
          return 1;
        return 0;
      });
    }
    return this.privateDocumentsTree;
  }

  public formatClass(classobject: IClass): string{
    return ClassAdapter.formatName(classobject);
  }

  protected loadPrivateSubject(course: any) {
    const CourseToAdd = new TreeNodeObj();
    CourseToAdd.children= null;
    CourseToAdd.label= course.subjectName;
    CourseToAdd.data= course.subjectId.toString();
    CourseToAdd.collapsedIcon= 'fa fa-folder-o';
    CourseToAdd.expandedIcon= 'fa fa-folder-open-o';
    CourseToAdd.selectable= false;

    this.documentService.findPrivateByCourseId(course.courseId)
      .then((res: Document[]) => {
        CourseToAdd.children= this.loadDocuments(res);
        this.privateDocumentNode.push(CourseToAdd);
      })
      .then((res: any)=>{
        this.privateDocumentsTree = <TreeNode[]> this.privateDocumentNode;
          this.sortPrivateDocumentsTree();
      })
      .catch((errMsg: string) => this.errorMessage = errMsg.split(':')[1]);
  }

  protected loadDocuments(documents: Document[]): TreeNodeObj[]{
    const DocumentsToReturn = new Array<TreeNodeObj>();
    documents.forEach(document => {
      const CurrentDocument = new TreeNodeObj();
      CurrentDocument.label = document.name;
      CurrentDocument.data = document.URL;
      CurrentDocument.icon = 'fa fa-file-text-o';
      DocumentsToReturn.push(CurrentDocument);
    });
    return DocumentsToReturn;
  }
}
