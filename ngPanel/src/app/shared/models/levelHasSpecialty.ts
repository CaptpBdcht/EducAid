export interface ILevelHasSpecialty {
  id: number;
  levelId: number;
  specialtyId: number;
}

export class LevelHasSpecialtyAdapter implements ILevelHasSpecialty {

  static formatName(levelHasSpecialtyObject: any): string {
    if (levelHasSpecialtyObject.specialtyId === null){
      return levelHasSpecialtyObject.levelName;
    }
    return levelHasSpecialtyObject.levelName+' '+levelHasSpecialtyObject.specialtyName;
  }

  id: number;
  levelId: number;
  specialtyId: number;
  levelName: string;
  specialtyName: string;
  name: string;

  constructor(
    id?: number,
    levelId?: number,
    specialtyId?: number,
    levelName?: string,
    specialtyName?: string,
    name?: string
  ) {
    this.id = id;
    this.levelId = levelId;
    this.specialtyId = specialtyId;
    this.levelName = levelName;
    this.specialtyName = specialtyName;
    this.name = this.formatName();
  };

  formatName(): string{
    if (this.specialtyId === null){
      return this.levelName;
    }
    return this.levelName+' '+this.specialtyName;
  };

  init(){
    this.name = this.formatName();
  };
}

export class LevelHasSpecialtyDTO implements ILevelHasSpecialty {
  id: number;
  levelId: number;
  specialtyId: number;

  constructor(
    id?: number,
    levelId?: number,
    specialtyId?: number
  ) {
    this.id = id;
    this.levelId = levelId;
    this.specialtyId = specialtyId;
  }
}
