import z from "zod/v4";

export const changePasswordSchema = z
	.object({
		password: z.string().min(6, "Password must be min 6 charactrers."),
		passwordConfirm: z.string(),
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
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
