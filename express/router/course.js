import express from 'express';
import multiparty from 'connect-multiparty';
import { assureAuth } from '../middlewares/authenticated.js';
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from '../controllers/course.js';

const md_upload = multiparty({ uploadDir: './uploads/course' });
export const courseRouter = express.Router();

courseRouter.get('/courses', assureAuth, getCourses);
courseRouter.post('/course', assureAuth, md_upload, createCourse);
courseRouter.patch('/course/:id', assureAuth, md_upload, updateCourse);
courseRouter.delete('/course/:id', assureAuth, deleteCourse);
