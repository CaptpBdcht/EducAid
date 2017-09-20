import { MakersComponent } from './makers.component';

import { QCMMakerComponent } from './qcm-maker/qcm-maker.component';

import { TeacherGuard } from '../../core/guards/teacher.guard';

export const MakersRoutes = {
  path: 'makers',
  component: MakersComponent,
  canActivate: [ TeacherGuard ],
  children: [
    { path: 'qcmmaker', component: QCMMakerComponent }
  ]
};

export const MakersComponents = [
  MakersComponent,
  // Exercices
  QCMMakerComponent
];
