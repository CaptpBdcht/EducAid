import { ProfileComponent } from './profile.component';

import { ProfileGuard } from '../../core/guards/profile.guard';

export const ProfileRoutes = {
  path: 'profile',
  canActivate: [ ProfileGuard ],
  component: ProfileComponent
};

export const ProfileComponents = [
  ProfileComponent
];
