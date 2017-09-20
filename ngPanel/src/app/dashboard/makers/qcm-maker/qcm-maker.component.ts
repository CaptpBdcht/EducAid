import { Component, OnInit } from '@angular/core';

import { Message, SelectItem } from 'primeng/primeng';

import { ILevel } from '../../../shared/models/level';
import { QCMDTO } from '../../../shared/models/qcm';
import { IQCMQuestion, QCMQuestionDTO } from '../../../shared/models/qcm-question';
import { ISubject } from '../../../shared/models/subject';
import { UserRole } from '../../../shared/models/user';

import { LevelService } from '../../../core/services/level.service';
import { QCMService } from '../../../core/services/qcm.service';
import { SubjectService } from '../../../core/services/subject.service';

@Component({
    selector: 'educaid-qcm-maker',
    templateUrl: 'qcm-maker.component.html'
})
export class QCMMakerComponent implements OnInit {

  answerNeeded =  2;
  answerMax = false;

  msgs: Message[] = [];

  exerciceName: string;

  selectedLevel: string;
  selectedSubject: string;

  levels: SelectItem[];
  subjects: SelectItem[];

  levelList: ILevel[];
  subjectList: ISubject[];

  displayDialogSave: boolean;
  displayDialog: boolean;
  error: boolean;
  errMsg: string;

  questions: IQCMQuestion[];
  question: IQCMQuestion = new QCMQuestionDTO();

  qcm: QCMDTO;

  answers: SelectItem[];

  constructor(
    private levelService: LevelService,
    private qcmService: QCMService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.answerNeeded = 2;
    this.qcm = new QCMDTO(null, 1, 1, '', null, '', null);
    this.questions = [];
    
    this.answers = [];
    this.answers.push({ label: '1', value: 1 });
    this.answers.push({ label: '2', value: 2 });
    this.answers.push({ label: '3', value: 3 });
    this.answers.push({ label: '4', value: 4 });
    this.answers.push({ label: '5', value: 5 });
    
    this.levelService.findAll()
    .then((levels: ILevel[]) => this.initLevels(levels))
    .then(() => this.findSubjectsByRole())
    .then((subjects: ISubject[]) => this.initSubjects(subjects));
  }

  findSubjectsByRole(): Promise<ISubject[]> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo.role === UserRole[UserRole.TEACHER])
      return this.subjectService.findAllByTeacherId();
    else
      return this.subjectService.findAll();
  }

  initLevels(levels: ILevel[]): void {
    this.levels = [];
    this.levelList = levels;
    levels.forEach(level => this.levels.push({ label: level.name, value: level.name }));
  }

  initSubjects(subjects: ISubject[]): void {
    this.subjects = [];
    this.subjectList = subjects;
    subjects.forEach(subject => this.subjects.push({ label: subject.name, value: subject.name }));
  }

  showAddQuestionDialog(): void {
    this.question = new QCMQuestionDTO(1, 'Mock', 'A', 'B', 'C', 'D', 'E');
    this.displayDialog = true;
  }

  showSaveQCMDialog(): void {
    if (this.questions.length > 0 && this.qcm.title) {
      this.qcm.questions = this.questions;
      this.displayDialogSave = true;
    }
  }

  addNeeded(): void {
    this.answerNeeded++;
    if (this.answerNeeded >= 5)
      this.answerMax = true;
  }

  add(): void {
    this.error = false;
    this.errMsg = '';

    if (!this.question.question) {
      this.error = true;
      this.errMsg = 'Please provide a question';
      return;
    }

    if (!this.question.answer1 || !this.question.answer2 ||
        (this.question.answer1 === this.question.answer2))
    {
      this.error = true;
      this.errMsg = 'At least 2 different answers required';
      return;
    }

    if (this.answerNeeded < 5) {
      this.question.answer5 = null;
      if (this.answerNeeded < 4) {
        this.question.answer4 = null;
        if (this.answerNeeded < 3) {
          this.question.answer3 = null;
        }
      }
    }

    this.questions.push(this.question);
    this.question = null;
    this.displayDialog = false;
    this.answerNeeded = 2;
    this.answerMax = false;
  }

  save(): void {
    if (!this.qcm.name)
      return;
    
    this.qcm.levelId = this.levelList.find(
      level => level.name === String(this.qcm.levelId)
    ).id;

    this.qcm.subjectId = this.subjectList.find(
      subject => subject.name === String(this.qcm.subjectId)
    ).id;

    this.qcmService.create(this.qcm);
    this.msgs.push({
      severity: 'info',
      summary: 'Réussite',
      detail: 'Nouveau QCM enregistré'
    });
    this.reinitUI();
    this.displayDialogSave = false;
  }

  reinitUI(): void {
    this.qcm = null;
    this.ngOnInit();
  }
}
