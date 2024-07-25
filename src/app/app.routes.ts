import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/lobby/lobby.route').then(feature => feature.lobbyRoute),
  },
  {
    path: 'slot/:slotId',
    loadChildren: () => import('./pages/slot/slot.route').then(feature => feature.slotRoute),
  },
  {
    path: 'slot-not-found/:slotId',
    loadChildren: () => import('./pages/slot-not-found/slot-not-found.route').then(feature => feature.slotNotFoundRoute),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
