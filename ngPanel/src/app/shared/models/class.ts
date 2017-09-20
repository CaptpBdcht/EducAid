export interface IClass {
  id: number;
  levelHasSpecialtyId: number;
  year: string;

  init(): void;
}

export class ClassAdapter implements IClass {

  static formatName(classobject: any): string {
    if (classobject.specialtyId === null){
      return classobject.level+' ('+classobject.year+')';
    }
    return classobject.level+' '+classobject.specialty+' ('+classobject.year+')';
  }

  id: number;
  levelHasSpecialtyId: number;
  associationName: string;
  name: string;
  levelId: number;
  level: string;
  specialtyId: number;
  specialty: string;
  year: string;

  constructor(
      id?: number,
      levelHasSpecialtyId?: number,
      associationName?: number,
      name?: string,
      levelId?: number,
      level?: string,
      specialtyId?: number,
      specialty?: string,
      year?: string
  ) {
    this.id = id;
    this.levelHasSpecialtyId = levelHasSpecialtyId;
    this.levelId = levelId;
    this.level = level;
    this.specialtyId = specialtyId;
    this.specialty = specialty;
    this.associationName = this.formatAssociationName();
    this.name = this.formatName();
    this.year = year;
  }

  formatAssociationName(): string{
    if (this.specialtyId === null){
      return this.level;
    }
    return this.level+' '+this.specialty;
  }

  formatName(): string {
    if (this.specialtyId === null){
      return this.level+' ('+this.year+')';
    }
    return this.level+' '+this.specialty+' ('+this.year+')';
  }

  init(){
    this.name = this.formatName();
    this.associationName = this.formatAssociationName();
  }
}

export class ClassDTO implements IClass {
  id: number;
  levelHasSpecialtyId: number;
  levelId: number;
  specialtyId: number;
  year: string;

  constructor(
    id?: number,
    levelHasSpecialtyId?: number,
    levelId?: number,
    specialtyId?: number,
    year?: string
  ) {
    this.id = id;
    this.levelHasSpecialtyId = levelHasSpecialtyId;
    this.levelId = levelId;
    this.specialtyId = specialtyId;
    this.year = year;
  }
  init(): void {

  }
}
