import express from 'express';
import { assureAuth } from '../middlewares/authenticated.js';
import {
  createMenu,
  deleteMenu,
  getMenus,
  updateMenu,
} from '../controllers/menu.js';

export const menuRouter = express.Router();

menuRouter.get('/menu', getMenus);
menuRouter.post('/menu', assureAuth, createMenu);
menuRouter.patch('/menu/:id', assureAuth, updateMenu);
menuRouter.delete('/menu/:id', assureAuth, deleteMenu);
