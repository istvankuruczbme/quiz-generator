import { supabase } from "../../../config/supabase";
import AppError from "../../error/classes/AppError";

export default async function updateAuthPassword(password: string): Promise<void> {
	// Update password
	const { error } = await supabase.auth.updateUser({ password });

	// Check error
	if (error) throw new AppError({ message: "Error updating password.", details: error.message });
}
