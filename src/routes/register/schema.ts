import { z } from "zod";

// Esquema de validação para registro de usuários
export const registerForm = z.object({
    username: z.string()
        .min(2, "Username must be at least 2 characters")
        .max(16, "Username can't excede 16 characters"),
    email: z.string()
        .email("Invalid email address"),
    password: z.string()
        .min(8, "Passwords need to be at least 8 characters long")
        .max(64, "Passwords can't excede 64 characters"),
    passwordConfirm: z.string().min(8).max(64),
    acceptTerms: z.boolean()
})

export type RegisterForm = typeof registerForm;