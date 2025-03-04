import { supabase } from "../../../config/supabase";

export default function signInWithGoogle() {
	supabase.auth.signInWithOAuth({ provider: "google" });
}
