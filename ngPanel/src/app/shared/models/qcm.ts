import { IQCMQuestion } from './qcm-question';

export interface IExercice {
  id: number;
  levelId: number;
  subjectId: number;
  name: string;
}

export interface IQCM {
  qcmId: number;
  title: string;
  questions: IQCMQuestion[];
}

export class QCMDTO implements IQCM, IExercice {
  id: number;
  levelId: number;
  subjectId: number;
  name: string;
  qcmId: number;
  title: string;
  questions: IQCMQuestion[];

  constructor(
    id?: number,
    levelId?: number,
    subjectId?: number,
    name?: string,
    qcmId?: number,
    title?: string,
    questions?: IQCMQuestion[]
  ) {
    this.id = id;
    this.levelId = levelId;
    this.subjectId = subjectId;
    this.name = name;
    this.qcmId = qcmId;
    this.title = title;
    this.questions = questions;
  }
}
