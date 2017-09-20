export interface IQCMQuestion {
  answerNb: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3?: string;
  answer4?: string;
  answer5?: string;
}

export class QCMQuestionDTO implements IQCMQuestion {
  answerNb: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3?: string;
  answer4?: string;
  answer5?: string;

  constructor(
    answerNb?: number,
    question?: string,
    answer1?: string,
    answer2?: string,
    answer3?: string,
    answer4?: string,
    answer5?: string
  ) {
    this.answerNb = answerNb;
    this.question = question;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.answer5 = answer5;
  }
}
