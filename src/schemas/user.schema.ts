import { Schema } from 'mongoose';

export const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  displayName: { type: String, required: false },
  email: { type: String, required: false },
  avatarUrl: { type: String, required: false },
  role: { type: String, required: true }
});
