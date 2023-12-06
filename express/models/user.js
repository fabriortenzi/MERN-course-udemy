import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  rol: String,
  active: Boolean,
  avatar: String
});

export const UserModel = mongoose.model('User', UserSchema)