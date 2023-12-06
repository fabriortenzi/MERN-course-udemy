import { decoded } from '../utils/jwt.js';

export function assureAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ msg: 'Authorization header missing' });
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    const payload = decoded(token);

    const { exp } = payload;
    const currentDate = new Date().getTime();

    if (exp <= currentDate) {
      return res.status(400).send({ msg: 'Token has expired' });
    }

    req.user = payload;
    next();
  } catch (error) {
    return res.status(500).send({ msg: 'Server error' });
  }
}
