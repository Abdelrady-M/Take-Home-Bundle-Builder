import { navigateTo } from "@mongez/react-router";
import user from "apps/front-office/account/user";
import URLS from "apps/front-office/utils/urls";

/**
 * Use this middleware if the page requires the user to be logged in
 */
export function Guardian() {
  if (!user.isLoggedIn()) {
    return navigateTo(URLS.auth.login);
  }
}

/**
 * Use this middleware if you want to redirect the user to the home page if he/she is logged in
 */
export function ReverseGuardian() {
  if (user.isLoggedIn()) {
    return navigateTo(URLS.home);
  }
}
