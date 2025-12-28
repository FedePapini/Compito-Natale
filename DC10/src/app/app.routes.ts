import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // ✅ HOME PUBBLICA
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing.component').then(m => m.LandingComponent),
  },

  // ✅ PUBBLICO
  {
    path: 'events',
    loadComponent: () =>
      import('./pages/events.component').then(m => m.EventsComponent),
  },
  {
    path: 'events/:id',
    loadComponent: () =>
      import('./pages/event-detail.component').then(m => m.EventDetailComponent),
  },

  // ✅ AUTH
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

  // ✅ AREA UTENTE (protetta)
  {
    path: 'me',
    loadComponent: () =>
      import('./pages/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard],
  },

  // ✅ ADMIN (protetta + admin)
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard, adminGuard],
  },

  { path: '**', redirectTo: '' },
];
