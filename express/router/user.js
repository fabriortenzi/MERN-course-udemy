import express from 'express';
import multiparty from 'connect-multiparty';
import {
  createUsers,
  deleteUser,
  getMe,
  getUsers,
  updateUser,
} from '../controllers/user.js';
import { assureAuth } from '../middlewares/authenticated.js';

export const userRouter = express.Router();

const md_upload = multiparty({ uploadDir: './uploads/avatar' });

userRouter.get('/user/me', assureAuth, getMe);
userRouter.get('/users', assureAuth, getUsers);
userRouter.post('/user', assureAuth, md_upload, createUsers);
userRouter.patch('/user/:id', assureAuth, md_upload, updateUser);
userRouter.delete('/user/:id', assureAuth, deleteUser);
