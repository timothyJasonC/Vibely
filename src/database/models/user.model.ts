import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profilePhoto: { type: String },
  username: { type: String },
  provider: { type: String },
})

const User = models.User || model('User', UserSchema);

export default User;