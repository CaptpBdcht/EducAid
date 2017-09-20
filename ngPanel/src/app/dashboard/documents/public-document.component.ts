import { Component,OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { Message } from 'primeng/primeng';

import { Document } from '../../shared/models/document';
import { DocumentService } from '../../core/services/document.service';
import { LogLevel, LoggerService } from '../../core/logs/logger.service';
import { SubjectService } from '../../core/services/subject.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'educaid-classes',
  templateUrl: 'public-document.component.html'
})
export class PublicDocumentComponent implements OnInit, AfterViewInit {

  errorMessage= '';
  warningmessage: Message[] = [];
  userId: number;
  searchText: any;
  documents: Document[];
  subjects: any[];
  subjectName= '';

  constructor(
    private documentService: DocumentService,
    private subjectService: SubjectService,
    private renderer: Renderer2,
    private logger: LoggerService
  ) {}

  public searchCourses(event?: any){
    this.subjectService.findAllBySubjectName(event.query).then(subjectsReturned => {
      this.subjects = subjectsReturned;
    });
  }

  public loadDocuments(event?: any){
    this.subjectName = event.name;
    this.documentService.findAllBySubjectId(event.id).then(documentsreturned =>{
      this.documents = documentsreturned;
    });
  }

  public loadUnclassifiedDocs(){
    this.documentService.findAllUnclassified().then(documentsreturned =>{
      this.documents = documentsreturned;
    });
  }

  public openDocument(event?: any) {
    window.open(environment.apiUrl+'/'+event.value[0].URL);
  }

  public onTabChange(event?: any){
    this.documents= null;
    if (event.index=== 1){
      this.loadUnclassifiedDocs();
    }
  }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userInfo')).id;
    this.warningmessage.push
      ({severity: 'warn', summary: '   Données indisponibles', detail: 'Vous n\'êtes lié à aucun cours'});
    this.logger.log({
      class: 'public-documentComponent',
      method: 'onInit',
      message: JSON.stringify(this.userId),
      level: LogLevel.Log
    });
  }
  ngAfterViewInit() {
      // cleaning documents by course
      this.renderer.selectRootElement('.ui-orderlist-controls').outerHTML= '';
      // cleaning unclassified documents
      this.renderer.selectRootElement('.ui-orderlist-controls').outerHTML= '';
  }
}
