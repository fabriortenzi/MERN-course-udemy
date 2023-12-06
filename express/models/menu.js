import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
  title: String,
  path: String,
  order: Number,
  active: Boolean,
});

export const MenuModel = mongoose.model('Menu', MenuSchema);
