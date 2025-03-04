import { useEffect } from "react";
import { supabase } from "../../../config/supabase";
import useUser from "../../../contexts/UserContext/useUser";
import isNewUser from "../utils/isNewUser";
import getUser from "../../user/services/getUser";
import createUser from "../../user/services/createUser";
import getUserData from "../utils/getUserData";

const useAuth = () => {
	// #region Hooks
	const { setUser, setLoading } = useUser();
	// #endregion

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			// console.log(event);
			setLoading(true);

			if (event === "SIGNED_IN" && session != null) {
				const authUser = session.user;

				// Check if new user
				if (isNewUser(authUser)) {
					try {
						// Get user data
						const { id, name, email, photoUrl } = getUserData(authUser);

						// Create user in DB
						await createUser(id, name, email, photoUrl);
					} catch (err) {
						console.log("Error creating the user.", err);
						return;
					}
				}

				try {
					// Fetch user data
					const user = await getUser(authUser.id);

					// Update user state
					setUser(user);
					setLoading(false);
				} catch (err) {
					console.log("Error fetching the user from DB.", err);
					setLoading(false);
				}
			}
			if (event === "SIGNED_OUT") {
				setUser(null);
				setLoading(false);
			}
			if (event === "INITIAL_SESSION") {
				setLoading(false);
			}
		});

		return () => data.subscription.unsubscribe();
	});
};

export default useAuth;
