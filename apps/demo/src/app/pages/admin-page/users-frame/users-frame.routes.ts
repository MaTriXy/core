import { Routes } from '@angular/router';
import { translate } from '@rucken/core';
import { UsersFrameComponent } from '@rucken/web';
import { AuthGuardService } from '@rucken/web';

export const DemoUsersFrameRoutes: Routes = [
  {
    path: '',
    component: UsersFrameComponent,
    data: {
      name: 'users',
      title: translate('Users'),
      visible: true
    },
    canActivate: [AuthGuardService]
  }
];
