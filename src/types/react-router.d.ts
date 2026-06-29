// Custom type declarations for react-router-dom v5
// Fixes incompatibility between @types/react 18.3+ and react-router v5 class components
// See: https://github.com/remix-run/react-router/issues/8620

declare module "react-router-dom" {
  import * as React from "react";
  import * as H from "history";

  export interface RouteComponentProps<
    Params extends { [K in keyof Params]?: string } = {},
    C extends StaticContext = StaticContext,
    S = H.LocationState
  > {
    history: H.History<S>;
    location: H.Location<S>;
    match: match<Params>;
    staticContext?: C | undefined;
  }

  export interface StaticContext {
    statusCode?: number | undefined;
  }

  export interface match<Params extends { [K in keyof Params]?: string } = {}> {
    params: Params;
    isExact: boolean;
    path: string;
    url: string;
  }

  export interface RouteProps {
    location?: H.Location | undefined;
    component?: React.ComponentType<any> | undefined;
    render?: ((props: any) => React.ReactNode) | undefined;
    children?: ((props: any) => React.ReactNode) | React.ReactNode | undefined;
    path?: string | string[] | undefined;
    exact?: boolean | undefined;
    sensitive?: boolean | undefined;
    strict?: boolean | undefined;
  }

  export interface RedirectProps {
    to: string | H.LocationDescriptor;
    push?: boolean | undefined;
    from?: string | undefined;
    path?: string | undefined;
    exact?: boolean | undefined;
    strict?: boolean | undefined;
  }

  export interface LinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string | H.LocationDescriptor;
    replace?: boolean | undefined;
    innerRef?: React.Ref<HTMLAnchorElement> | undefined;
  }

  export interface NavLinkProps extends LinkProps {
    activeClassName?: string | undefined;
    activeStyle?: React.CSSProperties | undefined;
    exact?: boolean | undefined;
    strict?: boolean | undefined;
    isActive?: ((match: any, location: H.Location) => boolean) | undefined;
  }

  export interface SwitchProps {
    children?: React.ReactNode | undefined;
    location?: H.Location | undefined;
  }

  export interface BrowserRouterProps {
    basename?: string | undefined;
    children?: React.ReactNode | undefined;
  }

  export interface HashRouterProps {
    basename?: string | undefined;
    children?: React.ReactNode | undefined;
  }

  export const Route: React.FC<RouteProps>;
  export const Redirect: React.FC<RedirectProps>;
  export const Link: React.FC<LinkProps>;
  export const NavLink: React.FC<NavLinkProps>;
  export const Switch: React.FC<SwitchProps>;
  export const BrowserRouter: React.FC<BrowserRouterProps>;
  export const HashRouter: React.FC<HashRouterProps>;

  export function useHistory<S = H.LocationState>(): H.History<S>;
  export function useLocation<S = H.LocationState>(): H.Location<S>;
  export function useParams<Params extends { [K in keyof Params]?: string } = {}>(): Params;
  export function useRouteMatch<Params extends { [K in keyof Params]?: string } = {}>(
    path?: string | string[] | RouteProps
  ): match<Params> | null;
  export function withRouter<P extends RouteComponentProps<any>>(
    component: React.ComponentType<P>
  ): React.ComponentClass<Omit<P, keyof RouteComponentProps<any>>>;
  export function generatePath(pattern: string, params?: { [paramName: string]: any }): string;
  export function matchPath<Params extends { [K in keyof Params]?: string }>(
    pathname: string,
    props: RouteProps,
    parent?: match<Params> | null
  ): match<Params> | null;
}

declare module "react-router" {
  export * from "react-router-dom";
}
