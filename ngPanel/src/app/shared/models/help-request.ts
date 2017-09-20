export interface IHelpRequest {
  id: number;
}

export class HelpRequestDTO implements IHelpRequest {
  id: number;
  helpful: string;
  firstname: string;
  lastname: string;
  exerciceName: string;
  
  constructor(
    id: number,
    helpful: string,
    firstname: string,
    lastname: string,
    exerciceName: string
  ) {
    this.id = id;
    this.helpful = helpful;
    this.firstname = firstname;
    this.lastname = lastname;
    this.exerciceName = exerciceName;
  }
}
