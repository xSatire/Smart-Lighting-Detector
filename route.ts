/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = ["/sign-in", "/register"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API auth
 * @type {string[]}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after login
 * @type {string[]}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";

export const url_route = "https://192.168.1.68:3000";
