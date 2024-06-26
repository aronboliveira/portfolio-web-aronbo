export interface RouterState {
  pathname: string;
  query: Record<string, any>;
  asPath: string;
}

export interface RouterSelectState {
  router: AppRouterInstance | NextRouter;
}

export interface RoutedProps extends Partial<RouterSelectState> {
  routerState?: AppRouterInstance | NextRouter | string | function;
  isServerComponent?: boolean;
}

export interface AppContextProps extends RouterSelectState {}
