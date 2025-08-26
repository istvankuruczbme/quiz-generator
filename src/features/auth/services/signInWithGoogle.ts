import { supabase } from "../../../config/supabase";
import AppError from "../../error/classes/AppError";

export default async function signInWithGoogle() {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${import.meta.env.VITE_CLIENT_URL}/`,
		},
	});

	if (error) {
		throw new AppError({ message: "Error signing in with Google.", details: error.message });
	}
}
