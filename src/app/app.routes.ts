import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'en',
    loadComponent: () =>
      import('./layout/lang-layout.component').then(m => m.LangLayoutComponent),
    data: { lang: 'en' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home-page/home-page.component').then(
            m => m.HomePageComponent,
          ),
      },
      {
        path: 'resume',
        loadComponent: () =>
          import('./resume-page/resume-page.component').then(
            m => m.ResumePageComponent,
          ),
      },
      {
        path: 'projects/:slug',
        loadComponent: () =>
          import('./case-study-page/case-study-page.component').then(
            m => m.CaseStudyPageComponent,
          ),
      },
    ],
  },
  {
    path: 'pt',
    loadComponent: () =>
      import('./layout/lang-layout.component').then(m => m.LangLayoutComponent),
    data: { lang: 'pt' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home-page/home-page.component').then(
            m => m.HomePageComponent,
          ),
      },
      {
        path: 'resume',
        loadComponent: () =>
          import('./resume-page/resume-page.component').then(
            m => m.ResumePageComponent,
          ),
      },
      {
        path: 'projects/:slug',
        loadComponent: () =>
          import('./case-study-page/case-study-page.component').then(
            m => m.CaseStudyPageComponent,
          ),
      },
    ],
  },
  { path: '', redirectTo: 'en', pathMatch: 'full' },
  { path: '**', redirectTo: 'en' },
];
