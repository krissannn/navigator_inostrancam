const ACCESS_TOKEN_KEY = 'access_token';
const CURRENT_USER_KEY = 'current_user';

export const authService = {
  setToken(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },

  getToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  clearToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  setCurrentUser(username: string) {
    localStorage.setItem(CURRENT_USER_KEY, username.trim().toLowerCase());
  },

  getCurrentUser() {
    return localStorage.getItem(CURRENT_USER_KEY) || "";
  },

  clearCurrentUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};