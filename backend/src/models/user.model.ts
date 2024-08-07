import mongoose, { type Document } from "mongoose";

interface IUser extends Document {
  avatar: string;
  name: string;
  username: string;
  email: string;
  password: string;
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export { User };
