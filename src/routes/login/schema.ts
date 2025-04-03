import { z } from "zod";

// Esquema de validação para login
export const loginForm = z.object({
    email: z.string().email("Email is invalid"),
    password: z.string()
        .min(8, "Passwords need to be at least 8 characters long")
        .max(64, "Passwords can't excede 64 characters")
})

export type LoginForm = typeof loginForm;