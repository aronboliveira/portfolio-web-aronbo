import { Routes, Route } from '@angular/router';

const langChildren: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./home-page/home-page.component').then(m => m.HomePageComponent),
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
];

const langRoute = (lang: string): Route => ({
  path: lang,
  loadComponent: () =>
    import('./layout/lang-layout.component').then(m => m.LangLayoutComponent),
  data: { lang },
  children: langChildren,
});

export const routes: Routes = [
  langRoute('en'),
  langRoute('pt'),
  { path: '', redirectTo: 'en', pathMatch: 'full' },
  { path: '**', redirectTo: 'en' },
];
