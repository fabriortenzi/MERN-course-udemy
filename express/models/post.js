import mongoose, { Mongoose } from 'mongoose';

// These lines make "require" available to use the library
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new mongoose.Schema({
  tile: String,
  miniature: String,
  content: String,
  path: {
    type: String,
    unique: true,
  },
  createdAt: Date,
});

PostSchema.plugin(mongoosePaginate);

export const PostModel = mongoose.model('Post', PostSchema);
