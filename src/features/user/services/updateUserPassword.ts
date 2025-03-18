import { supabase } from "../../../config/supabase";

export default async function updateUserPassword(password: string): Promise<void> {
	// Update password
	const { error } = await supabase.auth.updateUser({ password });

	// Check error
	if (error != null) throw error;
}
