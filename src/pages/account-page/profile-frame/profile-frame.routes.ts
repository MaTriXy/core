import { Routes } from '@angular/router';
import { ProfileFrameComponent } from './profile-frame.component';
import { translate } from '@rucken/core';

export const ProfileFrameRoutes: Routes = [
  {
    path: '',
    component: ProfileFrameComponent,
    data: {
      name: 'profile',
      title: translate('Profile'),
      visible: true
    }
  }
];
