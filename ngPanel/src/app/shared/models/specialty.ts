export interface ISpecialty {
  id: number;
  name: string;
}

export class SpecialtyDTO implements ISpecialty {
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
