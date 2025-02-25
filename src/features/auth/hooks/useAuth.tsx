import { useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import axios from "axios";
import useUser from "../../../contexts/UserContext/useUser";

const useAuth = () => {
	// #region Hooks
	const { setUser } = useUser();
	// #endregion

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === "SIGNED_IN" && session != null) {
				setUser(session.user);

				try {
					const { data } = await axios.get(
						`/test/users/${session.user.id}`
						// 	,
						// 	{
						// 	headers: {
						// 		Authorization: `Bearer ${session.access_token}`,
						// 	},
						// }
					);
					console.log("User data from DB: ", data);
				} catch (err) {
					console.log("Error fetching user data from DB.", err);
				}
			}
			if (event === "SIGNED_OUT") {
				setUser(null);
			}
		});

		return () => data.subscription.unsubscribe();
	});
};

export default useAuth;
