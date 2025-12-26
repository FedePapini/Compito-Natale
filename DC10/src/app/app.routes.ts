import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./pages/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./pages/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard, adminGuard],
  },
  { path: '**', redirectTo: '' },
];
