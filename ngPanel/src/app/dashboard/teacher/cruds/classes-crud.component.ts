import { Component, OnInit } from '@angular/core';

import { plainToClass } from 'class-transformer';

import { SelectItem } from 'primeng/primeng';

import { ClassService } from '../../../core/services/class.service';
/*import { LevelService } from '../../../core/services/level.service';
import { SpecialtyService } from '../../../core/services/specialty.service';*/
import { LevelHasSpecialtyService } from '../../../core/services/level-has-specialty.service';

import { IClass, ClassAdapter } from '../../../shared/models/class';
/*import { ILevel } from '../../../shared/models/level';
import { ISpecialty } from '../../../shared/models/specialty';*/
import { ILevelHasSpecialty, LevelHasSpecialtyAdapter } from '../../../shared/models/levelHasSpecialty';

@Component({
    selector: 'educaid-teacher-classes-crud',
    templateUrl: 'classes-crud.component.html'
})
export class ClassesCrudComponent implements OnInit {

  displayDialog: boolean;

  class: IClass = new ClassAdapter();
  
  selectedClass: ClassAdapter;

  newClass: boolean;

  classes: IClass[];

  associationList: ILevelHasSpecialty[];

  associations: SelectItem[];

  selectedassociation: string;

  constructor(
    private classService: ClassService,
    private levelHasSpecialtyService: LevelHasSpecialtyService
  ) {
    this.levelHasSpecialtyService.findAllFormatted()
    .then((associations: ILevelHasSpecialty[]) => this.initAssociations(associations));
  }

  initAssociations(associations: ILevelHasSpecialty[]): void {
    this.associations = [];
    this.associationList = associations;
    associations.forEach(association  => {
      association = plainToClass(LevelHasSpecialtyAdapter, association);
      (association as LevelHasSpecialtyAdapter).init();
      this.associations.push({ label: (association as LevelHasSpecialtyAdapter).name, value: association.id });
    });
  }

  ngOnInit(): void {
    this.classService.findAllFormatted()
    .then((classes: IClass[]) => {
      return new Promise((resolve, reject) => {
        const allClasses: IClass[] = [];
        classes.forEach(clazz =>{
          const singleClazz = plainToClass(ClassAdapter, clazz);
          singleClazz.init();
          allClasses.push(singleClazz);
          if (clazz === classes[classes.length-1]) {
            resolve(allClasses);
          }
        });
      });
    })
    .then((res: IClass[]) => {
      this.classes = res;
    });
  }

  showAddClassDialog(): void {
    this.newClass = true;
    this.class = new ClassAdapter();
    this.displayDialog = true;
  }

  save(): void {
    const classes = this.classes ? [...this.classes] : [];

    // Add
    if (this.newClass) {
      classes.push(this.class);
      this.classService.create(this.class)
          .then(() => this.reinitClassDialog());
    }
    // Update
    else {
      classes[this.findSelectedClassIndex()] = this.class;
      this.classService.update(this.class)
          .then(() => this.reinitClassDialog());
    }
  }

  reinitClassDialog(): void {
    this.class = null;
    this.selectedClass = null;
    this.displayDialog = false;
    this.ngOnInit();
  }

  delete(): void {
    const index = this.findSelectedClassIndex();
    this.classService.delete(this.classes[index].id);
    this.classes = this.classes.filter((val, i) => i !== index);
    this.class = null;
    this.displayDialog = false;
  }

  onRowSelect(event: any): void {
    this.newClass = false;
    this.class = this.cloneClass(event.data);
    this.displayDialog = true;
  }

  cloneClass(data: any): IClass {
    console.warn(data);
    return new ClassAdapter(
      data.id, data.levelId, data.level,
      data.specialtyId, data.specialty, data.year
    );
  }

  findSelectedClassIndex(): number {
    return this.classes.indexOf(this.selectedClass);
  }
}
