import { z } from "zod";

export const singupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(8, { message: "Name must be at least 8 characters long" })
    .max(50, { message: "Name must be less than 50 characters long" }),
  username: z
    .string()
    .trim()
    .min(8, { message: "Username must be at least 8 characters long" })
    .max(50, { message: "Username must be less than 50 characters long" }),
  email: z.string().trim().email({ message: "Email must be valid" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be less than 50 characters long" }),
});

export const signinSchema = z.object({
  email: z.string().trim().email({ message: "Email must be valid" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be less than 50 characters long" }),
});

export const updateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(8, { message: "Name must be at least 8 characters long" })
    .max(50, { message: "Name must be less than 50 characters long" }),
  username: z
    .string()
    .trim()
    .min(8, { message: "Username must be at least 8 characters long" })
    .max(50, { message: "Username must be less than 50 characters long" }),
  email: z.string().trim().email({ message: "Email must be valid" }),
});
