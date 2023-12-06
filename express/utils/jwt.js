import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../constants.js';

export function createAccessToken(user) {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);

  const payload = {
    token_type: 'access',
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };

  return jsonwebtoken.sign(payload, JWT_SECRET_KEY);
}

export function createRefreshToken(user) {
  const expToken = new Date();
  expToken.getMonth(expToken.getMonth() + 1);

  const payload = {
    token_type: 'refresh',
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };

  return jsonwebtoken.sign(payload, JWT_SECRET_KEY);
}

export function decoded(token) {
  return jsonwebtoken.decode(token, JWT_SECRET_KEY, true)
}
