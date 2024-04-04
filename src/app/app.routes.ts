/* Angular */
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.routes')
      .then((home) => home.routes)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];
