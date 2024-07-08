export interface RouterState {
  pathname: string;
  query: Record<string, any>;
  asPath: string;
}

export interface RouterSelectState {
  router: AppRouterInstance | NextRouter;
}
