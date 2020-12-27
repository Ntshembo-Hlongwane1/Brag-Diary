import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isMentor: { type: Boolean, default: false },
  pdGroup: { type: Number, default: 0 }, // Zero mean that the use has not group assigned to them
  profilePicture: { type: String, default: "" },
});

export const userModel = mongoose.model("userModel", userSchema);
