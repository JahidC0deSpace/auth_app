import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: "Hello, I am new here!" },
    isVerified: { type: Boolean, default: false },
    resetOTP: String,
    resetOTPExpires: Date,
  },
  { timestamps: true },
);

// THIS IS THE CRITICAL LINE:
export default mongoose.model("User", userSchema);
