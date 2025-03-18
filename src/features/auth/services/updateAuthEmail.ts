import { supabase } from "../../../config/supabase";

export default async function updateAuthEmail(email: string): Promise<void> {
	// Update email
	const { error } = await supabase.auth.updateUser({ email });

	// Check error
	if (error != null) throw error;
}
