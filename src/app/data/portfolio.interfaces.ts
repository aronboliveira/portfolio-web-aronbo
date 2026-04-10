import type { Lang } from '../services/language.service';

export interface FeaturedProject {
  slug: string;
  title: string;
  outcome: string;
  stacks: string[];
  href: string;
  repoHref: string;
}

export interface SkillSet {
  languages: string;
  frontend: string;
  backend: string;
  testing: string;
  tooling: string;
}

export interface ExperienceEntry {
  title: string;
  date: string;
  description: string;
  href: string;
}

export interface CourseEntry {
  title: string;
  date: string;
  instructor: string;
  href: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  problem: string;
  constraints: string;
  solution: string;
  stack: string;
  outcome: string;
  liveUrl: string;
  repoUrl: string;
}

export type I18n<T> = Record<Lang, T>;
