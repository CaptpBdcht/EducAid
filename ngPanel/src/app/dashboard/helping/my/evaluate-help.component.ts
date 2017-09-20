import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';

import { HelpRequestService } from '../../../core/services/help-request.service';
import { IHelpRequest, HelpRequestDTO } from '../../../shared/models/help-request';

@Component({
  selector: 'educaid-evaluate-help',
  templateUrl: 'evaluate-help.component.html'
})

export class EvaluateHelpComponent implements OnInit {

  msgs: Message[] = [];
  
  evaluations: number[];
  demands: IHelpRequest[];

  constructor(
    private helpRequestService: HelpRequestService
  ) {}

  ngOnInit() {
    this.helpRequestService.findAllPendingEvaluations()
    .then((requests: IHelpRequest[]) => this.initEvaluate(requests))
    .catch((error: string) => console.warn(error));
  }

  initEvaluate(requests: IHelpRequest[]): void {
    if (requests.length > 0) {
      this.evaluations = [];
      this.demands = requests as HelpRequestDTO[];
      this.demands.forEach(dmd => this.evaluations.push(0));
    }
    else {
      this.msgs.push({
        severity: 'warn',
        summary: '...Aucune demande trouvée',
        detail: 'Pas d \'aide à évaluer pour l\'instant'
      });
    }
  }

  saveRatings(): void {
    let i: number;
    for (i = 0; i < this.evaluations.length; i++) {
      if (this.evaluations[i] !== 0) {
        this.helpRequestService.updateRating(this.evaluations[i], this.demands[i].id)
        .then()
        .catch();
      }
    }
  }
}
