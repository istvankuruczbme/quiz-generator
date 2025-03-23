import { useCallback, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../../config/supabase";
import useUser from "../../../contexts/UserContext/useUser";
import isNewUser from "../utils/isNewUser";
import getUser from "../../user/services/getUser";
import createUser from "../../user/services/createUser";
import updateUserEmail from "../../user/services/updateUserEmail";

const useAuth = () => {
	// #region States
	const [previousSession, setPreviousSession] = useState<Session | null>(null);
	// #endregion

	// #region Hooks
	const { user, setUser, setLoading } = useUser();
	// #endregion

	// #region Functions
	const fetchUser = useCallback(
		async (userId: string, token: string) => {
			try {
				// Fetch user from DB
				const user = await getUser(userId, token);

				// Update user state
				setUser(user);
				setLoading(false);
			} catch (err) {
				console.log("Error fetching the user from DB.", err);
				setLoading(false);
			}
		},
		[setUser, setLoading]
	);
	//#endregion

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			console.log(event);
			// console.log(session);

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
					console.log("User created:", authUser);
					try {
						// Create user in DB
						await createUser(session.access_token);
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
						await updateUserEmail(authUser.id, authUser.email);

						console.log("User email updated.");
					} catch (err) {
						console.log("Error updating user email in DB.", err);
						setLoading(false);
						return;
					}
				}

				await fetchUser(authUser.id, session.access_token);
			}
			if (event === "TOKEN_REFRESHED" && session != null) {
				await fetchUser(session.user.id, session.access_token);
			}
			if (event === "SIGNED_OUT") {
				setUser(null);
			}
		});

		return () => data.subscription.unsubscribe();
	}, [previousSession, user, setUser, setLoading, fetchUser]);
};

export default useAuth;
