import { HelpingComponent } from './helping.component';

import { EvaluateHelpComponent } from './my/evaluate-help.component';
import { HelpDemandsComponent } from './my/help-demands.component';
import { HelpGivenComponent } from './my/help-given.component';

import { HelpingGuard } from '../../core/guards/helping.guard';

export const HelpingRoutes = {
  path: 'helping',
  component: HelpingComponent,
  canActivate: [ HelpingGuard ],
  children: [
    { path: 'demands', component: HelpDemandsComponent },
    { path: 'given', component: HelpGivenComponent },
    { path: 'evaluate', component: EvaluateHelpComponent }
  ]
};

export const HelpingComponents = [
  EvaluateHelpComponent,
  HelpDemandsComponent,
  HelpGivenComponent,
  HelpingComponent
];
