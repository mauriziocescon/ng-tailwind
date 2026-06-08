import { Route } from '@angular/router';

import { UsersPage } from './users-page';

import { UsersDataClient } from './users-data-client';
import { UsersStore } from './users-store';

export default [
  {
    path: '',
    component: UsersPage,
    title: 'Users',
    providers: [UsersDataClient, UsersStore],
  },
] satisfies Route[];
