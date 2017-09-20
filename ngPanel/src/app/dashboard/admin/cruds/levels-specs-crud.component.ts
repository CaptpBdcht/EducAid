import { Component, OnInit } from '@angular/core';

import { LevelService } from '../../../core/services/level.service';
import { SpecialtyService } from '../../../core/services/specialty.service';

import { ILevel, LevelDTO } from '../../../shared/models/level';
import { ISpecialty, SpecialtyDTO } from '../../../shared/models/specialty';

@Component({
    selector: 'educaid-levels-specs-admin',
    templateUrl: 'levels-specs-crud.component.html'
})
export class LevelsSpecsCrudComponent implements OnInit {

  displayDialogLevel: boolean;
  displayDialogSpecialty: boolean;

  level: ILevel = new LevelDTO();
  specialty: ISpecialty = new SpecialtyDTO();

  selectedLevel: ILevel;
  selectedSpecialty: ISpecialty;

  newLevel: boolean;
  newSpecialty: boolean;

  levels: ILevel[];
  specialties: ISpecialty[];

  constructor(
    private levelService: LevelService,
    private specialtyService: SpecialtyService
  ) {}

  ngOnInit(): void {
    this.initLevels();
    this.initSpecialties();
  }

  initLevels(): void {
    this.levelService.findAll()
        .then((levels: ILevel[]) => this.levels = levels);
  }

  initSpecialties(): void {
    this.specialtyService.findAll()
        .then((specialties: ISpecialty[]) => this.specialties = specialties);
  }

  showAddLevelDialog(): void {
    this.newLevel = true;
    this.level = new LevelDTO();
    this.displayDialogLevel = true;
  }

  showAddSpecialtyDialog(): void {
    this.newSpecialty = true;
    this.specialty = new SpecialtyDTO();
    this.displayDialogSpecialty = true;
  }

  saveLevel() {
    const levels = this.levels ? [...this.levels] : [];
    if (this.newLevel) {
      levels.push(this.level);
      this.levelService.create(this.level)
          .then(() => this.reinitLevelDialog());
    }
    else {
      levels[this.findSelectedLevelIndex()] = this.level;
      this.levelService.update(this.level)
          .then(() => this.reinitLevelDialog());
    }
  }

  saveSpecialty() {
    const specialties = this.specialties ? [...this.specialties] : [];
    if (this.newSpecialty) {
      specialties.push(this.specialty);
      this.specialtyService.create(this.specialty)
          .then(() => this.reinitSpecialtyDialog());
    }
    else {
      specialties[this.findSelectedSpecialtyIndex()] = this.specialty;
      this.specialtyService.update(this.specialty)
          .then(() => this.reinitSpecialtyDialog());
    }
  }

  reinitLevelDialog(): void {
    this.level = null;
    this.selectedLevel = null;
    this.displayDialogLevel = false;
    this.initLevels();
  }

  reinitSpecialtyDialog(): void {
    this.specialty = null;
    this.selectedSpecialty = null;
    this.displayDialogSpecialty = false;
    this.initSpecialties();
  }

  deleteLevel(): void {
    const index = this.findSelectedLevelIndex();
    this.levelService.delete(this.levels[index].id);
    this.levels = this.levels.filter((val, i) => i !== index);
    this.level = null;
    this.displayDialogLevel = false;
  }

  deleteSpecialty(): void {
    const index = this.findSelectedSpecialtyIndex();
    this.specialtyService.delete(this.specialties[index].id);
    this.specialties = this.specialties.filter((val, i) => i !== index);
    this.specialty = null;
    this.displayDialogSpecialty = false;
  }

  onRowLevelSelect(event: any): void {
    this.newLevel = false;
    this.level = this.cloneLevel(event.data);
    this.displayDialogLevel = true;
  }

  onRowSpecialtySelect(event: any): void {
    this.newSpecialty = false;
    this.specialty = this.cloneSpecialty(event.data);
    this.displayDialogSpecialty = true;
  }

  cloneLevel(data: any): ILevel {
    return new LevelDTO(data.id, data.name);
  }

  cloneSpecialty(data: any): ISpecialty {
    return new SpecialtyDTO(data.id, data.name);
  }

  findSelectedLevelIndex(): number {
    return this.levels.indexOf(this.selectedLevel);
  }

  findSelectedSpecialtyIndex(): number {
    return this.specialties.indexOf(this.selectedSpecialty);
  }
}
