import z from "zod/v4";

export const signUpSchema = z
	.object({
		name: z.string().trim().nonempty("Name missing."),
		email: z.email("Invalid email format."),
		password: z.string().min(6, "Password must be min 6 charactrers."),
		passwordConfirm: z.string(),
		policy: z.literal(true, "Policy must be approved to continue."),
	})
	.check((ctx) => {
		// Get password values
		const { password, passwordConfirm } = ctx.value;

		// Check different password
		if (passwordConfirm !== password) {
			ctx.issues.push({
				input: passwordConfirm,
				message: "Passwords don't match.",
				path: ["passwordConfirm"],
				code: "custom",
			});
		}
	});
export type SignUpData = z.infer<typeof signUpSchema>;
