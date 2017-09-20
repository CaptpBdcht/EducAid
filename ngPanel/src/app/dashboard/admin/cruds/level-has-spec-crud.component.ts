import { Component, OnInit } from '@angular/core';

import { SelectItem } from 'primeng/primeng';

import { LevelService } from '../../../core/services/level.service';
import { SpecialtyService } from '../../../core/services/specialty.service';
import { LevelHasSpecialtyService } from '../../../core/services/level-has-specialty.service';

import { ILevel, LevelDTO } from '../../../shared/models/level';
import { ISpecialty, SpecialtyDTO } from '../../../shared/models/specialty';
import { ILevelHasSpecialty, LevelHasSpecialtyDTO, LevelHasSpecialtyAdapter } 
from '../../../shared/models/levelHasSpecialty';

@Component({
    selector: 'educaid-levels-specs-admin',
    templateUrl: 'level-has-spec-crud.component.html'
})
export class LevelHasSpecComponent implements OnInit {

  displayDialogAssociation: boolean;
  newAssociation: boolean;

  level: ILevel = new LevelDTO();
  specialty: ISpecialty = new SpecialtyDTO();
  association: ILevelHasSpecialty = new LevelHasSpecialtyDTO();

  selectedLevel: ILevel;
  selectedSpecialty: ISpecialty;
  selectedAssociation: ILevelHasSpecialty;
  associationList: ILevelHasSpecialty[];

  levels: SelectItem[];
  levelsList: ILevel[];

  specialties: SelectItem[];
  specialtiesList: ISpecialty[];

  associations: ILevelHasSpecialty[];

  searchLevelText= '';
  searchSpecialtyText= '';

  constructor(
    private levelService: LevelService,
    private levelHasSpecialtyService: LevelHasSpecialtyService,
    private specialtyService: SpecialtyService
  ) {
    this.levelService.findAll()
    .then((levels: ILevel[]) => this.initLevels(levels));
    this.specialtyService.findAll()
    .then((specialties: ISpecialty[]) => this.iniSpecialties(specialties));
  }

  ngOnInit(): void {
    this.initAssociations();
  }

  initAssociations(): void {
    this.levelHasSpecialtyService.findAllFormatted()
        .then((associations: ILevelHasSpecialty[]) => this.associations = associations);
  }
  initLevels(levels: ILevel[]): void{
    this.levels = [];
    this.levelsList = levels;
    levels.forEach(level  => {
      this.levels.push({ label: level.name, value: level.id });
    });
  }
  iniSpecialties(specialties: ISpecialty[]): void{
    this.specialties = [];
    this.specialtiesList = specialties;
    specialties.forEach(specialty  => {
      this.specialties.push({ label: specialty.name, value: specialty.id });
    });
  }

  showAddAssociationDialog(): void {
    this.newAssociation = true;
    this.association = new LevelHasSpecialtyDTO();
    this.displayDialogAssociation = true;
  }

  saveAssociation() {
    const associations = this.associations ? [...this.associations] : [];
    if (this.newAssociation) {
      associations.push(this.association);
      this.levelHasSpecialtyService.create(this.association)
          .then(() => this.reinitAssociationDialog());
    }
    else {
      associations[this.findSelectedAssociationIndex()] = this.association;
      this.levelHasSpecialtyService.update(this.association)
          .then(() => this.reinitAssociationDialog());
    }
  }

  reinitAssociationDialog(): void {
    this.association = null;
    this.displayDialogAssociation = false;
    this.initAssociations();
  }

  deleteAssociation(): void {
    const index = this.findSelectedAssociationIndex();
    this.levelHasSpecialtyService.delete(this.associations[index].id);
    this.associations = this.associations.filter((val, i) => i !== index);
    this.association = null;
    this.displayDialogAssociation = false;
  }

  onRowAssociationSelect(event: any): void {
    this.newAssociation = false;
    this.association = this.cloneAssociation(event.data);
    this.displayDialogAssociation = true;
  }

  cloneAssociation(data: any): ILevelHasSpecialty {
    return new LevelHasSpecialtyAdapter(data.id, data.levelId, data.specialtyId, data.levelName, data.specialtyName);
  }

  findSelectedAssociationIndex(): number {
    return this.associations.indexOf(this.selectedAssociation);
  }
}
