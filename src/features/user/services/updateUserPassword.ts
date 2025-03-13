import { supabase } from "../../../config/supabase";

export default async function updateUserPassword(password: string): Promise<void> {
	await supabase.auth.updateUser({ password });
}
