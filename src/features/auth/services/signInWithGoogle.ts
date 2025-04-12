import { supabase } from "../../../config/supabase";

export default function signInWithGoogle() {
	supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${import.meta.env.VITE_CLIENT_URL}/`,
		},
	});
}
