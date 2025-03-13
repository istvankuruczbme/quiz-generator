import { useEffect } from "react";
import { supabase } from "../../../config/supabase";
import useUser from "../../../contexts/UserContext/useUser";
import isNewUser from "../utils/isNewUser";
import getUser from "../../user/services/getUser";
import createUser from "../../user/services/createUser";
import getUserData from "../utils/getUserData";
import updateEmail from "../services/updateEmail";

const useAuth = () => {
	// #region Hooks
	const { user, setUser, setLoading, refresh } = useUser();
	// #endregion

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			console.log(event);
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
						setLoading(false);
						return;
					}
				}

				// Check different email
				if (user != null && authUser.email != undefined && user.email !== authUser.email) {
					try {
						// Update user email in DB
						await updateEmail(authUser.id, authUser.email);

						console.log("User email updated.");
					} catch (err) {
						console.log("Error updating user email in DB.", err);
						setLoading(false);
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
	}, [setLoading, user, setUser, refresh]);
};

export default useAuth;
