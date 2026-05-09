import { RenderMode, ServerRoute } from '@angular/ssr';
import { CASE_STUDIES } from './data/case-studies';
import type { Lang } from './services/language.service';

const SUPPORTED_LANGS: Lang[] = ['en', 'pt', 'es'];
const CASE_STUDY_SLUGS = Object.keys(CASE_STUDIES);

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SUPPORTED_LANGS.map(lang => ({ lang }));
    },
  },
  {
    path: ':lang/resume',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SUPPORTED_LANGS.map(lang => ({ lang }));
    },
  },
  {
    path: ':lang/projects/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SUPPORTED_LANGS.flatMap(lang =>
        CASE_STUDY_SLUGS.map(slug => ({ lang, slug })),
      );
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
