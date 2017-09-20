import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudentExerciceService } from '../../../core/services/student-exercice.service';

@Component({
  selector: 'educaid-evolution',
  templateUrl: 'evolution.component.html'
})

export class EvolutionComponent implements OnInit, OnDestroy {
  private sub: any;

  courseId: number;
  
  datasLoaded: boolean;
  evolutionData: any;

  firstTryLabel = '1er essai';
  lastTryLabel = 'Dernier essai';
  dataLabels: string[];
  firstTryDatas: number[];
  lastTryDatas: number[];

  constructor(
    private route: ActivatedRoute,
    private studentExerciceService: StudentExerciceService
  ) {}

  ngOnInit() {
    this.datasLoaded = false;
    this.sub = this.route.params.subscribe(params => {
      this.courseId = +params['courseId'];
      this.findEvolutionDatas();
    });
  }

  findEvolutionDatas(): void {
    this.studentExerciceService.findCourseEvolution(this.courseId)
    .then((result: any) => this.fetchDatas(result))
    .then(() => this.initChart())
    .catch((error: string) => console.error(error));
  }

  fetchDatas(datas: any): Promise<void> {
    if (!datas)
      return Promise.reject('');

    this.dataLabels = [];
    this.firstTryDatas = [];
    this.lastTryDatas = [];

    for (const element of datas) {
      if (element.mark != null) {
        this.dataLabels.push(element.exerciceName);
        this.firstTryDatas.push(Math.floor(Math.random() * 20) + 1);
        this.lastTryDatas.push(Math.floor(Math.random() * 20) + 1); 
      }
    }

    return Promise.resolve();
  }

  initChart(): void {
    this.evolutionData = {
      labels: this.dataLabels,
      datasets: [
        {
          label: this.firstTryLabel,
          data: this.firstTryDatas,
          fill: true,
          borderColor: '#4bc0c0'
        },
        {
          label: this.lastTryLabel,
          data: this.lastTryDatas,
          fill: false,
          borderColor: '#565656'
        }
      ]
    };

    this.datasLoaded = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
