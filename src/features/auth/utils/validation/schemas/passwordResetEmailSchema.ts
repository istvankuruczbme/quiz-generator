import z from "zod/v4";

export const passwordResetEmailSchema = z.object({
	email: z.email("Invalid email format."),
});
export type PasswordResetEmailData = z.infer<typeof passwordResetEmailSchema>;
