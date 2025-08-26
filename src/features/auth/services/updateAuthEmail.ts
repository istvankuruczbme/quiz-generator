import { supabase } from "../../../config/supabase";
import AppError from "../../error/classes/AppError";

export default async function updateAuthEmail(email: string): Promise<void> {
	// Update email
	const { error } = await supabase.auth.updateUser({ email });

	// Check error
	if (error) {
		throw new AppError({ message: "Error sending confirmation email.", details: error.message });
	}
}
