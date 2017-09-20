import { AdminComponent } from './admin.component';

import { LevelsSpecsCrudComponent } from './cruds/levels-specs-crud.component';
import { LevelHasSpecComponent } from './cruds/level-has-spec-crud.component';
import { SubjectsCrudComponent } from './cruds/subjects-crud.component';
import { UsersCrudComponent } from './cruds/users-crud.component';

import { AdminGuard } from '../../core/guards/admin.guard';

export const AdminRoutes = {
  path: 'admin',
  component: AdminComponent,
  canActivate: [ AdminGuard ],
  children: [
    { path: 'users', component: UsersCrudComponent },
    { path: 'levelspec', component: LevelsSpecsCrudComponent },
    { path: 'level-has-spec', component: LevelHasSpecComponent }, 
    { path: 'subjects', component: SubjectsCrudComponent }
  ]
};

export const AdminComponents = [
  AdminComponent,
  LevelsSpecsCrudComponent,
  LevelHasSpecComponent,
  SubjectsCrudComponent,
  UsersCrudComponent
];
