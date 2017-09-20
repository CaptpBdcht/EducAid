import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';

import { ExerciceService } from '../../../core/services/exercice.service';
import { HelpRequestService } from '../../../core/services/help-request.service';
import { StudentExerciceService } from '../../../core/services/student-exercice.service';
import { IQCMQuestion, QCMQuestionDTO } from '../../../shared/models/qcm-question';

@Component({
  selector: 'educaid-resolve-qcm',
  templateUrl: 'resolve-qcm.component.html'
})

export class ResolveQCMComponent implements OnInit, OnDestroy {
  private sub: any;
  
  resolveMsgs: Message[] = [];
  msgs: Message[] = [];
  
  classId: number;
  exerciceId: number;

  haveLastMark: boolean = false;
  lastMark: number[] = [];

  qcmId: number;
  qcmTitle: string;
  questions: IQCMQuestion[];
  answers: number[];

  constructor(
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private exerciceService: ExerciceService,
    private helpRequestService: HelpRequestService,
    private studentExerciceService: StudentExerciceService
  ) { }

  ngOnInit() { 
    this.sub = this.route.params.subscribe(params => {
      this.classId = +params['classId'];
      this.exerciceId = +params['exerciceId'];
      this.initDatas();
      this.initResolved();
    });
  }

  initDatas(): void {
    this.exerciceService.findQCMByExerciceId(this.exerciceId)
    .then((qcm: any) => this.initQCM(qcm))
    .catch((error: string) => console.error(error));
  }

  initQCM(qcm: any): void {
    this.qcmId = qcm[0].qcmId;
    this.qcmTitle = qcm[0].qcmTitle;
    this.initQuestions(qcm);
  }

  initQuestions(qcm: any): void {
    this.questions = [];
    this.answers = [];

    for (const element of qcm) {
      this.questions.push(new QCMQuestionDTO(
        0,
        element.question,
        element.answer1,
        element.answer2,
        element.answer3,
        element.answer4,
        element.answer5
      ));
      this.answers.push(element.answerNb);
    }
  }

  initResolved(): void {
    this.studentExerciceService.findMark(this.exerciceId)
    .then((result: any) => this.initLastMark(result))
    .catch((error: string) => console.error(error));
  }

  initLastMark(result: any): void {
    const marks = result[0];
    if (marks && marks.mark != null && marks.max_mark != null) {
      this.haveLastMark = true;
      this.lastMark.push(marks.mark);
      this.lastMark.push(marks.max_mark);
      this.resolveMsgs.push({
        severity: 'warn',
        summary: '...Exercice terminé',
        detail: 'Dernier score : ' + this.formatMark() + '. ' + this.wellDoneOrDoBetter()
      });
    }
  }

  formatMark(): string {
    return this.lastMark[0] + '/' + this.lastMark[1];
  }

  wellDoneOrDoBetter(): string {
    return this.lastMark[0] === this.lastMark[1]
        ? 'Bien joué !'
        : 'Tentez de faire mieux !'; 
  }

  askForHelp(): void {
    this.helpRequestService.create(this.classId, this.exerciceId)
    .then(() => this.growlHelpAsked());
  }

  growlHelpAsked(): void {
    this.msgs = [{
      severity: 'info',
      summary: 'Demande traitée',
      detail: 'De l\'aide à été démandée !'
    }];
  }

  confirmValidation() {
    this.confirmationService.confirm({
      message: 'Do you want to validate your answers ?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => this.acceptValidation(),
      reject: () => this.refuseValidation()
    });
  }

  acceptValidation(): void {
    let score = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].answerNb === this.answers[i]) {
        score++;
      }
    }

    if (this.haveLastMark) {
      this.studentExerciceService.update(this.exerciceId, score, this.questions.length)
      .then(() => this.showAnswerSavedGrowl())
      .catch((error: string) => console.error(error));
    }
    else {
      this.studentExerciceService.create(this.exerciceId, score, this.questions.length)
      .then(() => this.showAnswerSavedGrowl())
      .catch((error: string) => console.error(error));
    }
  }

  deleteIfPendingHelpRequest(): Promise<void> {
    return this.helpRequestService.deleteByAskerAndExercice(this.exerciceId);
  }

  showAnswerSavedGrowl(): void {
    this.deleteIfPendingHelpRequest();
    this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Saved answers !' }];
  }

  refuseValidation(): void {
    this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'Continuing QCM...' }];
  }

  answerUpdate(event: any): void {
    this.questions.find(question => question.question === event[0]).answerNb = event[1];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
