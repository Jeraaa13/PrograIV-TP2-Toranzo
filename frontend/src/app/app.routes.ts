import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'publicaciones', pathMatch: 'full' },
  {
    path: 'registro',
    loadComponent: () => import('./componentes/registro').then((m) => m.Registro),
  },
  {
    path: 'login',
    loadComponent: () => import('./componentes/login').then((m) => m.Registro),
  },
  {
    path: 'mi-perfil',
    loadComponent: () => import('./componentes/mi-perfil').then((m) => m.Registro),
  },
  {
    path: 'publicaciones',
    loadComponent: () => import('./componentes/publicaciones').then((m) => m.Registro),
  },
];
