import mongoose from 'mongoose';

// These lines make "require" available to use the library
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongoosePaginate = require('mongoose-paginate-v2');

const CourseSchema = new mongoose.Schema({
  title: String,
  miniature: String,
  description: String,
  url: String,
  price: Number,
  score: Number,
});

CourseSchema.plugin(mongoosePaginate);

export const CourseModel = mongoose.model('Course', CourseSchema);

CourseModel.paginate().then({});
