import { Http, setCurrentHttp } from "@mongez/http";
import { getCurrentLocaleCode } from "@mongez/localization";
import { currentRoute, navigateTo } from "@mongez/react-router";
import { URLS } from "shared/urls";
import { user } from "user";
import { apiBaseUrl } from "../flags";

export const endpoint = new Http({
  baseURL: apiBaseUrl,
  cache: false,
  auth: () => {
    if (user.isLoggedIn()) {
      return `Bearer ${user.getAccessToken()}`;
    }
  },
});

endpoint.before(request => ({
  ...request,
  headers: {
    ...request.headers,
    lang: getCurrentLocaleCode(),
  },
}));

endpoint.after<any>(result => {
  if (result.error) {
    if (result.error.isUnauthorized) {
      user.logout();
      if (currentRoute() !== URLS.auth.login) {
        navigateTo(URLS.auth.login);
      }
    }

    return;
  }

  const payload = result.data;
  const data = payload?.data ? payload.data : payload;

  if (data?.user) {
    user.login(data.user);
  }

  return { ...result, data };
});

setCurrentHttp(endpoint);
