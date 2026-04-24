
const ACCESS_TOKEN_KEY = 'access_token';

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

  isAuthenticated() {
    return !!this.getToken();
  }
};