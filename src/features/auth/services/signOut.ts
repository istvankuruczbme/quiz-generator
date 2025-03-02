import { supabase } from "../../../config/supabase";

export default async function signOut() {
	try {
		await supabase.auth.signOut();
	} catch (err) {
		console.log("Error signing out the user.\n", err);
	}
}
