import { Component, OnInit } from '@angular/core';

import { Message } from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';

import { HelpRequestService } from '../core/services/help-request.service';
import { IHelpRequest, HelpRequestDTO } from '../shared/models/help-request';
import { UserRole } from '../shared/models/user';

@Component({
  selector: 'educaid-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  receivedHelpReq: IHelpRequest[] = [];
  msgs: Message[] = [];
  oneSecond = 1000;

  constructor(
    private helpRequestService: HelpRequestService
  ) {}

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo.role === UserRole[UserRole.TEACHER] ||
        userInfo.role === UserRole[UserRole.STUDENT])
    {
      Observable
      .interval(this.oneSecond * 30)
      .subscribe(() => this.receiveHelpRequests());
    }
  }

  receiveHelpRequests(): void {
    this.helpRequestService.findAllRequestsOnAllClassesByUserId()
    .then((requests: IHelpRequest[]) => this.loadRequests(requests))
    .catch((error: string) => console.warn(error));
  }

  loadRequests(requests: IHelpRequest[]): void {
    const values = requests as HelpRequestDTO[];
    
    values.forEach(helpRequest => {
      if (!this.receivedHelpReq.find(req => req.id === helpRequest.id)) {
        this.receivedHelpReq.push(helpRequest);
        this.msgs.push({
          severity: 'info',
          summary: helpRequest.firstname + ' ' + helpRequest.lastname + ' à besoin d\'aide !',
          detail: 'Exercice : ' + helpRequest.exerciceName
        });
      }
    });
  }
}
