import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/form/pages/home/home').then((m) => m.Home),
  },
  {
    path: 'form',
    loadComponent: () => import('./features/form/pages/wizard/wizard').then((m) => m.Wizard),
  },
  {
    path: 'success',
    loadComponent: () => import('./features/form/pages/success/success').then((m) => m.Success),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
