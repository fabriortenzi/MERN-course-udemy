import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.js';
import { getImagePath } from '../utils/image.js';

export async function getMe(req, res) {
  const { user_id } = req.user;

  const user = await UserModel.findById(user_id);

  if (!user) {
    return res.status(400).send({ msg: "User doesn't exists" });
  }

  return res.status(200).send(user);
}

export async function getUsers(req, res) {
  try {
    const { active } = req.query;
    let response;

    if (active === undefined) {
      response = await UserModel.find();
    } else {
      const query = UserModel.where({ active: active });
      response = await query.find();
    }

    return res.status(200).send({ response });
  } catch {
    return res.status(500).send({ msg: 'Server error' });
  }
}

export async function createUsers(req, res) {
  const { password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  let imagePath;
  if (req.files.avatar) {
    imagePath = getImagePath(req.files.avatar);
  }

  try {
    await UserModel.create({
      ...req.body,
      active: true,
      password: hash,
      avatar: imagePath,
    }).then((user) => {
      return res.status(200).send({ msg: 'User created', body: user });
    });
  } catch {
    return res.status(500).send({ msg: 'Error when creating User' });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const userData = req.body;

    if (userData.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      userData.password = hash;
    } else {
      delete userData.password;
    }

    if (req.files.avatar) {
      const imagePath = getImagePath(req.files.avatar);
      userData.avatar = imagePath;
    }

    await UserModel.findByIdAndUpdate({ _id: id }, userData);

    return res.status(200).send({ msg: 'User updated successfully' });
  } catch {
    return res.status(500).send({ msg: 'Error when updating User' });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    await UserModel.findByIdAndDelete(id);

    return res.status(200).send({ msg: 'User deleted' });
  } catch {
    return res.status(500).send({ msg: 'Error when deleting User' });
  }
}
