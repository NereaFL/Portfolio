import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'experience', loadComponent: () => import('./pages/experience/experience').then(m => m.Experience) },
  { path: 'courses', loadComponent: () => import('./pages/courses/courses').then(m => m.Courses) },
  { path: 'projects', loadComponent: () => import('./pages/projects/projects').then(m => m.Projects) },
  { path: 'skills', loadComponent: () => import('./pages/skills/skills').then(m => m.Skills) },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  { path: '**', redirectTo: '' },
];
