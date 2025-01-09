import { homeOutline } from "ionicons/icons";

// Pages
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";

export interface RouteConfig {
  path: string;
  name: string;
  component?: React.ComponentType;
  exact?: boolean;
  icon?: string;
  showInMenu?: boolean;
  redirectTo?: string;
}

export const routes: RouteConfig[] = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    exact: true,
    icon: homeOutline,
    showInMenu: true,
  },

  {
    path: "*",
    name: "Not Found",
    component: NotFound,
    showInMenu: false,
  },
];
