import { supabase } from "../../../config/supabase";

export default async function updateUserEmail(email: string): Promise<void> {
	await supabase.auth.updateUser({ email });
}
