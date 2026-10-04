import { Routes } from '@angular/router';
import {
  authGuard,
  loginGuard,
  libraryGuard,
  adminGuard
} from './guards/auth.guard';

export const routes: Routes = [

  // Main Library Login / Landing Page
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component')
        .then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },

  // Optional explicit login URL
  {
    path: 'login',
    redirectTo: '',
    pathMatch: 'full'
  },

  // Library - Default authenticated page
  {
    path: 'library-grid',
    loadComponent: () =>
      import('./pages/library-grid/library-grid.component')
        .then(m => m.LibraryGridComponent),
    canActivate: [authGuard, libraryGuard]
  },

  {
    path: 'library-dashboard',
    loadComponent: () =>
      import('./pages/library-dashboard/library-dashboard.component')
        .then(m => m.LibraryDashboardComponent),
    canActivate: [authGuard, libraryGuard]
  },

  {
    path: 'library-students',
    loadComponent: () =>
      import('./pages/library-students/library-students.component')
        .then(m => m.LibraryStudentsComponent),
    canActivate: [authGuard, libraryGuard]
  },

  {
    path: 'library-expenses',
    loadComponent: () =>
      import('./pages/library-expenses/library-expenses.component')
        .then(m => m.LibraryExpensesComponent),
    canActivate: [authGuard, libraryGuard]
  },

  {
    path: 'library-registration-requests',
    loadComponent: () =>
      import('./pages/library-registration-requests/library-registration-requests.component')
        .then(m => m.LibraryRegistrationRequestsComponent),
    canActivate: [authGuard, libraryGuard]
  },

  {
    path: 'library-complaints',
    loadComponent: () =>
      import('./pages/library-complaints/library-complaints.component')
        .then(m => m.LibraryComplaintsComponent),
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'library-bulk-whatsapp',
    loadComponent: () =>
      import('./pages/library-bulk-whatsapp/library-bulk-whatsapp.component')
        .then(m => m.LibraryBulkWhatsappComponent),
    canActivate: [authGuard, adminGuard]
  },

  // Public digital library
  {
    path: 'library/resources',
    loadComponent: () =>
      import('./pages/public-resources/public-resources.component')
        .then(m => m.PublicResourcesComponent)
  },

  {
    path: 'resources',
    loadComponent: () =>
      import('./pages/digital-library/digital-library.component')
        .then(m => m.DigitalLibraryComponent)
  },

  // Fallback
  {
    path: '**',
    redirectTo: ''
  }
];