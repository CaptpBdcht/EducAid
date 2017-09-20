export interface ISubject {
  id: number;
  name: string;
}

export class SubjectDTO implements ISubject {
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
