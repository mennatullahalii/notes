import { z } from "zod";

// ==========================================
// User & Authentication Contracts
// ==========================================

export const RegisterSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" }),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const AuthResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.string(),
    email: z.email(),
  }),
});

// ==========================================
// Note Contracts
// ==========================================

export const CreateNoteSchema = z.object({
  title: z.string().min(1, { error: "Title is required" }).max(100),
  content: z.string(),
});

export const UpdateNoteSchema = CreateNoteSchema.partial();

export const NoteResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const NoteListResponseSchema = z.array(NoteResponseSchema);

// ==========================================
// Inferred TypeScript Types
// ==========================================
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export type CreateNoteInput = z.infer<typeof CreateNoteSchema>;
export type UpdateNoteInput = z.infer<typeof UpdateNoteSchema>;
export type NoteResponse = z.infer<typeof NoteResponseSchema>;
