export enum LevelGrade {
  NONE = 0,
  FIRST = 1,
  SECOND = 2,
  SUPERIOR = 3
}

export interface ILevel {
  id: number;
  name: string;
}

export class LevelDTO implements ILevel {
  id: number;
  name: string;

  constructor(
    id?: number,
    name?: string
  ) {
    this.id = id;
    this.name = name;
  }
}
