import mongoose from 'mongoose';

// These lines make "require" available to use the library
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongoosePaginate = require('mongoose-paginate-v2');

const NewsletterShema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
});

NewsletterShema.plugin(mongoosePaginate);

export const NewsletterModel = mongoose.model('Newsletter', NewsletterShema);
