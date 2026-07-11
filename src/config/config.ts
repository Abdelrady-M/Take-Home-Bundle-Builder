import "./definitions.d.ts";
import "./initial-config";

// keep the previous line to be empty to ignore the import sort as `initial-config` must be imported first
import {
  type ApplicationConfigurations,
  setAppConfigurations,
} from "@mongez/react";
import { setHelmetConfigurations } from "@mongez/react-helmet";
import { jsxConverter } from "@mongez/react-localization";
import { setRouterConfigurations } from "@mongez/react-router";
import { localeCodesList } from "shared/utils/localization.js";
import {
  defaultLocaleCode,
  fallbackLocaleCode,
} from "../shared/flags/index.js";
import { routerConfigurations } from "./router-configurations";

// @mongez/react-helmet configurations
setHelmetConfigurations({
  appendAppName: true,
  appNameSeparator: " | ",
  translatable: true,
  translateAppName: true,
});

// keep this for the app handling, just change the values
const appConfigurations: ApplicationConfigurations = {
  localization: {
    defaultLocaleCode: defaultLocaleCode,
    fallback: fallbackLocaleCode,
    locales: localeCodesList,
    converter: jsxConverter,
  },
};

// router configurations
setRouterConfigurations(routerConfigurations);

setAppConfigurations(appConfigurations);
