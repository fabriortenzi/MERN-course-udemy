import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { API_VERSION } from './constants.js';
import { authRouter } from './router/auth.js';
import { userRouter } from './router/user.js';
import { menuRouter } from './router/menu.js';
import { courseRouter } from './router/course.js';
import { postRouter } from './router/post.js';
import { newsletterRouter } from './router/newsletter.js';

export const app = express();

// Configure bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static('uploads'));

// Configure cors
app.use(cors());

// Configure routing
app.use(`/api/${API_VERSION}`, authRouter);
app.use(`/api/${API_VERSION}`, userRouter);
app.use(`/api/${API_VERSION}`, menuRouter);
app.use(`/api/${API_VERSION}`, courseRouter);
app.use(`/api/${API_VERSION}`, postRouter);
app.use(`/api/${API_VERSION}`, newsletterRouter);
