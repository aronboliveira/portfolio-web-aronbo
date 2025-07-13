import { voidishJSXAr, voidishRoot } from "./types";

export interface RoutedProps extends Partial<RouterSelectState> {
  routerState?: AppRouterInstance | NextRouter | string | function;
  isServerComponent?: boolean;
}

export interface GenericErrorProps {
  message: string;
}

export interface IconErrorProps {
  fill: boolean;
}

export interface RetryErrorComponentProps extends GenericErrorProps {
  altRoot: voidishRoot;
  altJsx: voidishJSX;
}
