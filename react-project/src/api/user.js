import { env } from '../utils';

export class User {
  baseApi = env.BASE_API;

  async getUsers(accessToken, active = undefined) {
    try {
      const url = `${this.baseApi}/${env.API_ROUTES.USERS}?active=${active}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getMe(accessToken) {
    try {
      const url = `${this.baseApi}/${env.API_ROUTES.USER_ME}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createUser(accessToken, data) {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.append('avatar', data.fileAvatar);
      }

      const url = `${this.baseApi}/${env.API_ROUTES.USER}`;
      const params = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(accessToken, userId, userData) {
    try {
      const data = userData;
      if (!data.password) {
        delete data.password;
      }

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.append('avatar', data.fileAvatar);
      }

      const url = `${env.BASE_API}/${env.API_ROUTES.USER}/${userId}`;
      const params = {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(accessToken, userId) {
    try {
      const url = `${this.baseApi}/${env.API_ROUTES.USER}/${userId}`
      const params = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }

      const response = await fetch(url, params)
      const result = await response.json()

      if (response.status !== 200) throw result

      return result
    } catch (error) {
      throw error
    }
  }
}
