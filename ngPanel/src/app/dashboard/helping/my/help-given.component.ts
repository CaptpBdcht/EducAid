import { Component, OnInit } from '@angular/core';

import { HelpRequestService } from '../../../core/services/help-request.service';
import { IHelpRequest, HelpRequestDTO } from '../../../shared/models/help-request';

@Component({
  selector: 'educaid-help-given',
  templateUrl: 'help-given.component.html'
})

export class HelpGivenComponent implements OnInit {
   
  demands: IHelpRequest[];

  constructor(
    private helpRequestService: HelpRequestService
  ) {}

  ngOnInit() {
    this.helpRequestService.findAllHelpedByUserId()
    .then((requests: IHelpRequest[]) => this.demands = requests as HelpRequestDTO[])
    .catch((error: string) => console.warn(error));
  }
}
