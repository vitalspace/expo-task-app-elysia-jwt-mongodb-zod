import mongoose, { type Document } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  author: string;
  type: string;
}

const taskSchema: mongoose.Schema<ITask> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  author: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model<ITask>("Task", taskSchema);
export { Task };
