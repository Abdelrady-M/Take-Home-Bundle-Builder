import endpoint from "shared/endpoint";

// @mongez/http resolves with `{ data, error }` instead of rejecting,
// so opt every auth request into throwing for the `.catch()` callers.
const options = { throw: true };

/**
 * Get Guest token
 */
export function getGuestToken() {
  return endpoint.post("/login/guests", undefined, options);
}

/**
 * Perform login
 */
export function login(data: any) {
  return endpoint.post("/login", data, options);
}

/**
 * Create new account
 */
export function register(data: any) {
  return endpoint.post("/register", data, options);
}

/**
 * Get current user data
 */
export function getMe() {
  return endpoint.get("/me", options);
}

/**
 * Edit user profile
 */
export function editProfile(data: any) {
  return endpoint.post("/me", data, options);
}

/**
 * Change password
 */
export function changePassword(data: any) {
  return endpoint.post("/change-password", data, options);
}

/**
 * Forget password request
 */
export function forgetPassword(data: any) {
  return endpoint.post("/forget-password", data, options);
}

/**
 * Verify forget password code
 */
export function verifyForgetPassword(data: any) {
  return endpoint.post("/verify-code", data, options);
}

/**
 * Reset password
 */
export function resetPassword(data: any) {
  return endpoint.post("/reset-password", data, options);
}

/**
 * Register verification code
 */
export function verifyCode(data: any) {
  return endpoint.post("/register/verify-code", data, options);
}

/**
 * Login using google
 */
export function loginByGoogle(token: string) {
  return endpoint.post("/login/google", { token }, options);
}

/**
 * Login using facebook
 */
export function loginByFacebook(token: string) {
  return endpoint.post("/login/facebook", { token }, options);
}
