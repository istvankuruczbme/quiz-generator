import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../../config/supabase";
import useUser from "../../../contexts/UserContext/useUser";
import isNewUser from "../utils/isNewUser";
import getUser from "../../user/services/getUser";
import createUser from "../../user/services/createUser";
import getUserData from "../utils/getUserData";
import updateEmail from "../services/updateEmail";

const useAuth = () => {
	// #region States
	const [previousSession, setPreviousSession] = useState<Session | null>(null);
	// #endregion

	// #region Hooks
	const { user, setUser, setLoading } = useUser();
	// #endregion

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			console.log(event);

			if (event === "SIGNED_IN" && session != null) {
				// Check same session
				if (previousSession != null && previousSession.access_token == session.access_token) {
					return;
				}

				setLoading(true);

				// Update previous session
				setPreviousSession(session);

				// Get user from session
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
					// Fetch user from DB
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
			}
			if (event == "PASSWORD_RECOVERY") {
				// Ask for new password
				const newPassword = prompt("What would you like your new password to be?");

				// Check new passowrd
				if (newPassword == null) return;

				try {
					// Update password
					const { error } = await supabase.auth.updateUser({ password: newPassword });

					// Check error
					if (error != null) throw error;

					console.log("Password updated.");
				} catch (err) {
					console.log("Error reseting the password of the user.", err);
				}
			}
		});

		return () => data.subscription.unsubscribe();
	}, [previousSession, user, setUser, setLoading]);
};

export default useAuth;
