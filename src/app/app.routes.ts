import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./lobby/lobby.route').then(feature => feature.lobbyRoute),
  },
];
