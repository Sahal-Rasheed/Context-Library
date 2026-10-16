import { z } from "zod";

// LIBRARY

const baseItemSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z.string().max(500, "Description too long"),
  ctx: z.string().max(500, "Context too long"),
  folder: z.string().optional(), // optional: an empty folder means the item lands in the Inbox
  tags: z.array(z.string()), // will be [] if no tags are provided, we set that in useForm hook 'defaultValues'
});

export const itemFormSchema = z.discriminatedUnion("type", [
  baseItemSchema.extend({
    type: z.literal("LINK"),
    url: z.url("Please enter a valid URL (e.g. https://...)"),
  }),
  baseItemSchema.extend({
    type: z.literal("SNIPPET"),
    language: z.string().min(1, "Language is required"),
    code: z.string().min(1, "Code snippet is required"),
  }),
  baseItemSchema.extend({
    type: z.literal("NOTE"),
    body: z.string().min(1, "Note body is required"),
  }),
  baseItemSchema.extend({
    type: z.literal("AI_CONVERSATION"),
    provider: z.string().min(1, "Provider is required"),
    originalUrl: z.url("Please enter a valid URL (e.g. https://...)"),
    transcript: z.string().min(1, "Transcript is required"),
  }),
]);

export type ItemFormData = z.infer<typeof itemFormSchema>;

// AUTH

export const registrationSchema = z
  .object({
    name: z.string().min(2, { error: "Name must be at least 2 characters long." }),
    email: z.email({ error: "Invalid email address." }),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long." })
      .max(128, { error: "Password must be at most 128 characters long." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"], // path to the field that caused the error
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
  email: z.email({ error: "Invalid email address." }),
  password: z.string().min(1, { error: "Password is required." }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
