import { MyPictureComponent } from './my-picture.component';

import { MyPictureGuard } from '../../core/guards/my-picture.guard';

export const MyPictureRoutes = {
  path: 'my-picture',
  canActivate: [ MyPictureGuard ],
  component: MyPictureComponent
};

export const MyPictureComponents = [
  MyPictureComponent
];
