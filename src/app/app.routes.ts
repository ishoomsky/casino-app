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
    loadChildren: () => import('./pages/slot-not-available/slot-not-available.route').then(feature => feature.slotNotAvailableRoute),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
