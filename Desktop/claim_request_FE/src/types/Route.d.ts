interface RouteConfig {
  icon?: React.ReactNode;
  children?: RouteConfig[];
  path?: string | undefined;
  label?: string;
  component?: React.LazyExoticComponent<React.FC<any>>;
  protected?: boolean;
  role?: (typeof ROLE)[keyof typeof ROLE][];
  element?: React.ReactNode;
}
export default RouteConfig;
