import { Component, OnInit } from '@angular/core';

import { HelpRequestService } from '../../../core/services/help-request.service';
import { IHelpRequest, HelpRequestDTO } from '../../../shared/models/help-request';

@Component({
  selector: 'educaid-help-demands',
  templateUrl: 'help-demands.component.html'
})

export class HelpDemandsComponent implements OnInit {
  
  demands: IHelpRequest[];

  constructor(
    private helpRequestService: HelpRequestService
  ) {}

  ngOnInit() {
    this.helpRequestService.findAllRequestsOnAllClassesByUserId()
    .then((requests: IHelpRequest[]) => this.demands = requests as HelpRequestDTO[])
    .catch((error: string) => console.warn(error));
  }

  helpDemand(demand: IHelpRequest): void {
    this.helpRequestService.updateHelper(demand.id)
    .then(() => this.ngOnInit())
    .catch((error: string) => console.error(error));
  }
}
