import { publicRoutes } from "@/app/config/router";
import { URLS } from "shared/urls";
import { HomePage } from "./pages/HomePage";

publicRoutes([
  {
    path: URLS.home,
    component: HomePage,
  },
]);
