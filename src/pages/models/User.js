import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address.",
      ],
    },
    password: { type: String, required: true },
    address: { type: String, required: true },
    admin: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

dataSchema.index({ email: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model("User", dataSchema);

export default User;
