import { publicRoutes } from "@/app/config/router";
import { URLS } from "shared/urls";
import { BundleBuilderPage } from "./pages/BundleBuilderPage";

publicRoutes([
  {
    path: URLS.home,
    component: BundleBuilderPage,
  },
]);
