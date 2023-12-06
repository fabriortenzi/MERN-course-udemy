import express from 'express';
import multiparty from 'connect-multiparty';
import { assureAuth } from '../middlewares/authenticated.js';
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../controllers/post.js';

export const postRouter = express.Router();

const md_upload = multiparty({ uploadDir: './uploads/blog' });

postRouter.get('/posts', assureAuth, getPosts);
postRouter.get('/post/:path', getPost);
postRouter.post('/post', assureAuth, md_upload, createPost);
postRouter.patch('/post/:id', assureAuth, md_upload, updatePost);
postRouter.delete('/post/:id', assureAuth, deletePost);
