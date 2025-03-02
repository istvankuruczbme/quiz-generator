import { User } from "@supabase/supabase-js";

export default function isNewUser(user: User) {
	return new Date().getTime() - new Date(user.created_at).getTime() < 3 * 1000;
}
