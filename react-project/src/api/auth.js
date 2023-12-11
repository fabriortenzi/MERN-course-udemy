import { env } from '../utils';

export class Auth {
  baseApi = env.BASE_API;

  async register(data) {
    try {
      const url = `${this.baseApi}/${env.API_ROUTES.REGISTER}`;
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      console.log(result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(data) {
    try {
      const url = `${this.baseApi}/${env.API_ROUTES.LOGIN}`;
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  refreshAccessToken = async (refreshToken) => {
    try {
      const url = `${this.baseApi}/${env.API_ROUTES.REFRESH_ACCESS_TOKEN}`;
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {}
  };

  setAccessToken(token) {
    localStorage.setItem(env.JWT.ACCESS, token);
  }

  getAccessToken() {
    return localStorage.getItem(env.JWT.ACCESS);
  }

  setRefreshToken(token) {
    localStorage.setItem(env.JWT.REFRESH, token);
  }

  getRefreshToken() {
    return localStorage.getItem(env.JWT.REFRESH);
  }

  removeTokens() {
    localStorage.removeItem(env.JWT.ACCESS);
    localStorage.removeItem(env.JWT.REFRESH);
  }
}
