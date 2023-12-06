import mongoose from 'mongoose';
import {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  API_VERSION,
  IP_SERVER,
} from './constants.js';
import { app } from './app.js';

const PORT = process.env.PORT || 3000;

try {
  mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`);
  console.log('Database connected succesfully');

  app.listen(PORT, () => {
    console.log(
      `Server listening on port http://${IP_SERVER}:${PORT}/api/${API_VERSION}`
    );
  });
} catch {
  throw error;
}
