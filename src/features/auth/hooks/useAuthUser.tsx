import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import getAuthToken from "../services/getAuthToken";
import getAuthUser from "../services/getAuthUser";

const useAuthUser = () => {
	// #region States
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	//#endregion

	useEffect(() => {
		(async function () {
			try {
				// Get auth token
				const token = await getAuthToken();

				// Get user
				const user = await getAuthUser(token);

				// Update state
				setUser(user);
			} catch (err) {
				console.log("Error getting the user from auth.", err);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return { user, loading };
};

export default useAuthUser;
