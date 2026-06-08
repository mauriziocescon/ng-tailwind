import { Route } from '@angular/router';

import { AlbumsPage } from './albums-page';

import { AlbumsDataClient } from './albums-data-client';
import { AlbumsStore } from './albums-store';

export default [
  {
    path: '',
    component: AlbumsPage,
    title: 'Albums',
    providers: [AlbumsDataClient, AlbumsStore],
  },
] satisfies Route[];
