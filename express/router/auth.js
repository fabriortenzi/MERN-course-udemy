import express from 'express';
import { login, refreshAccessToken, register } from '../controllers/auth.js';

export const authRouter = express.Router();

authRouter.post('/auth/register', register);
authRouter.post('/auth/login', login);
authRouter.post('/auth/refresh-access-token', refreshAccessToken);
