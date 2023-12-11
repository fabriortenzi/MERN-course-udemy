import { env } from "../utils";

export class User {
  baseApi = env.BASE_API

  async getMe(accessToken) {
    try {
      const url = `${this.baseApi}/${env.API_ROUTES.USER_ME}`
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }

      const response = await fetch(url, params)
      const result = await response.json()

      if(response.status !== 200) throw result

      return result
    } catch (error) {
      throw error
    }
  }
}