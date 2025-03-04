import { User } from "@supabase/supabase-js";
import { InsertUserData } from "../../user/types/userTypes";

export default function getUserData(user: User): InsertUserData {
	switch (user.app_metadata.provider) {
		case "email":
			return {
				id: user.id,
				name: user.user_metadata!.name,
				email: user.email!,
				photoUrl: null,
			};
		case "google":
			return {
				id: user.id,
				name: user.user_metadata!.full_name,
				email: user.email!,
				photoUrl: user.user_metadata!.avatar_url,
			};
		default:
			throw new Error("auth/invalid-provider");
	}
}
