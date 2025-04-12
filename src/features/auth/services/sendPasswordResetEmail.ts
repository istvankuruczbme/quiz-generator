import { supabase } from "../../../config/supabase";

export default async function sendPasswordResetEmail(email: string): Promise<void> {
	// Send password reset email
	const { error } = await supabase.auth.resetPasswordForEmail(email as string, {
		redirectTo: `${import.meta.env.VITE_CLIENT_URL}/reset-password`,
	});

	// Check error
	if (error != null) throw error;
}
