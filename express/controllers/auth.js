import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.js';
import {
  createAccessToken,
  createRefreshToken,
  decoded,
} from '../utils/jwt.js';

export async function register(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!email) res.status(400).send({ msg: 'Email required' });

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    await UserModel.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hash,
      active: false,
    }).then((user) => {
      res.status(200).send({ msg: user });
    });
  } catch (error) {
    res.status(400).send({ msg: 'An error has ocurred' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) res.status(400).send({ msg: 'Email required' });
    if (!password) res.status(400).send({ msg: 'Password required' });

    const lowerCaseEmail = email.toLowerCase();    
    const query = UserModel.where({ email: lowerCaseEmail });
    const user = await query.findOne();

    if (bcrypt.compareSync(password, user.password)) {
      if (!user.active) res.status(401).send({ msg: 'Unauthorized User' });

      res.status(200).send({
        access: createAccessToken(user),
        refresh: createRefreshToken(user),
      });
    } else {
      res.status(500).send({ msg: 'Internal Server error' });
    }
  } catch {
    res.status(500).send({ msg: 'Server error' });
  }
}

export async function refreshAccessToken(req, res) {
  try {
    const { token } = req.body;
    if (!token) res.status(400).send({ msg: 'Token required' });

    const { user_id } = decoded(token);
    const query = UserModel.where({ _id: user_id });
    const user = await query.findOne();

    if (user) {
      res.status(200).send({
        accessToken: createAccessToken(user),
      });
    }
  } catch {
    res.status(500).send({ msg: 'Internal Server Error' });
  }
}
