import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/lobby/lobby.route').then(feature => feature.lobbyRoute),
  },
];
