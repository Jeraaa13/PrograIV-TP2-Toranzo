import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./componentes/spinner/spinner').then((m) => m.Spinner) },
  {
    path: 'registro',
    loadComponent: () => import('./componentes/registro/registro').then((m) => m.Registro),
  },
  {
    path: 'login',
    loadComponent: () => import('./componentes/login/login').then((m) => m.Login),
  },
  {
    path: 'mi-perfil',
    canActivate: [authGuard],
    loadComponent: () => import('./componentes/mi-perfil/mi-perfil').then((m) => m.MiPerfil),
  },
  {
    path: 'publicaciones',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./componentes/publicaciones/publicaciones').then((m) => m.Publicaciones),
  },
  {
    path: 'publicacion/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./componentes/publicacion-detalle/publicacion-detalle').then(
        (m) => m.PublicacionDetalle,
      ),
  },
  {
    path: 'usuarios',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./componentes/dashboard-usuarios/dashboard-usuarios').then(
        (m) => m.DashboardUsuarios,
      ),
  },
  {
    path: 'estadisticas',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./componentes/dashboard-estadisticas/dashboard-estadisticas').then(
        (m) => m.DashboardEstadisticas,
      ),
  },
];
