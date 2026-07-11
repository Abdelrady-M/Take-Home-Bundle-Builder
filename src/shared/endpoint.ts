import { Http, setCurrentHttp } from "@mongez/http";
import { getCurrentLocaleCode } from "@mongez/localization";
import { navigateTo } from "@mongez/react-router";
import user from "apps/front-office/account/user";
import URLS from "apps/front-office/utils/urls";
import { apiBaseUrl } from "./flags";

const endpoint = new Http({
  putToPost: false,
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
      navigateTo(URLS.auth.login);
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

export default endpoint;
