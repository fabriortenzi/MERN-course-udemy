const SERVER_IP = 'localhost:3000';

export const env = {
  BASE_PATH: `http://${SERVER_IP}`,
  BASE_API: `http://${SERVER_IP}/api/v1`,
  API_ROUTES: {
    REGISTER: 'auth/register',
  },
};