import { supabase } from "../../../config/supabase";
import AppError from "../../error/classes/AppError";

export default async function sendPasswordResetEmail(email: string): Promise<void> {
	// Send password reset email
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${import.meta.env.VITE_CLIENT_URL}/reset-password`,
	});

	// Check error
	if (error) {
		throw new AppError({
			message: "Error sending password reset email.",
			details: error.message,
		});
	}
}
