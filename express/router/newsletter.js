import express from 'express';
import {
  deleteEmail,
  getEmails,
  suscribeEmail,
} from '../controllers/newsletter.js';
import { assureAuth } from '../middlewares/authenticated.js';

export const newsletterRouter = express.Router();

newsletterRouter.get('/newsletters', assureAuth, getEmails);
newsletterRouter.post('/newsletter', suscribeEmail);
newsletterRouter.delete('/newsletter/:id', assureAuth, deleteEmail);
