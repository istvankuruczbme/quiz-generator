import z from "zod/v4";

export const signInSchema = z.object({
	email: z.email("Invalid email format."),
	password: z.string().min(6, "Password must be min 6 charactrers."),
});
export type SignInData = z.infer<typeof signInSchema>;
