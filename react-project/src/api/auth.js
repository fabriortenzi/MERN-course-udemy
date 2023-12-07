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
}
