import { publicRoutes } from "app/config/router";
import { URLS } from "shared/urls";
import { DesignSystemPage } from "./pages/DesignSystemPage/DesignSystemPage";

publicRoutes([
  {
    path: URLS.designSystem,
    component: DesignSystemPage,
  },
]);
