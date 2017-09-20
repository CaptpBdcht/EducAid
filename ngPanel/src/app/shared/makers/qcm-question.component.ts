import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SelectItem } from 'primeng/primeng';

import { QCMQuestionDTO } from '../models/qcm-question';

@Component({
  selector: 'educaid-qcm-question',
  templateUrl: 'qcm-question.component.html'
})
export class QCMQuestionComponent implements OnInit {
    
  @Input()
  question: QCMQuestionDTO;

  @Output()
  changeEmitter: EventEmitter<any[]> = new EventEmitter<any[]>();

  header: string;
  items: SelectItem[];
  selectedItem: string;

  constructor() {}

  ngOnInit(): void {
    this.header = this.question.question;
    this.items = [];
    this.selectedItem = this.getSelected(this.question.answerNb);

    this.items.push({ value: this.question.answer1, label: this.question.answer1 });
    this.items.push({ value: this.question.answer2, label: this.question.answer2 });

    if (this.question.answer3)
      this.items.push({ value: this.question.answer3, label: this.question.answer3 });
    if (this.question.answer4)
      this.items.push({ value: this.question.answer4, label: this.question.answer4 });
    if (this.question.answer5)
      this.items.push({ value: this.question.answer5, label: this.question.answer5 });
  }

  getSelected(itemNo: number): string {
    switch (itemNo) {
      case 1: return this.question.answer1;
      case 2: return this.question.answer2;
      case 3: return this.question.answer3;
      case 4: return this.question.answer4;
      case 5: return this.question.answer5;
      default: return null;
    }
  }

  getSelectedNo(item: string): number {
    switch (item) {
      case this.question.answer1: return 1;
      case this.question.answer2: return 2;
      case this.question.answer3: return 3;
      case this.question.answer4: return 4;
      case this.question.answer5: return 5;
      default: return null;
    }
  }

  changeVal(event: any) {
    const changedVal = [ this.question.question, this.getSelectedNo(event.value) ];
    this.changeEmitter.emit(changedVal);
  }
}
