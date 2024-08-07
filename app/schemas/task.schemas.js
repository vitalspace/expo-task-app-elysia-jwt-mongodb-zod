import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, { message: "Must be at least 10 characters" }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Must be at least 10 characters" }),
  type: z.enum([
    "Daily",
    "Work",
    "Personal",
    "Leisure",
    "Health",
    "Relationship",
    "Finance",
  ]),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, { message: "Must be at least 10 characters" }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Must be at least 10 characters" }),
  completed: z.boolean(),
});
