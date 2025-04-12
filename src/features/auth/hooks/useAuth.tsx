import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../../config/supabase";
import useUser from "../../../contexts/UserContext/useUser";
import getUser from "../../user/services/getUser";
import updateUserEmail from "../../user/services/updateUserEmail";
import getPasswordResetFlag from "../utils/getPasswordResetFlag";
import createUser from "../../user/services/createUser";
import removeNewUserFlag from "../utils/removeNewUserFlag";
import { useNavigate } from "react-router-dom";
import checkAxiosError from "../../../utils/axios/checkAxiosError";
import getAxiosErrorMessage from "../../../utils/axios/getAxiosErrorMessage";

const useAuth = () => {
	// #region States
	const [previousSession, setPreviousSession] = useState<Session | null>(null);
	// #endregion

	// #region Hooks
	const { user, setUser, setLoading } = useUser();
	const navigate = useNavigate();
	// #endregion

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			console.log(event);
			// console.log(session?.access_token);

			// Ignore password recovery event -> user must not be fetched
			if (event === "PASSWORD_RECOVERY" || getPasswordResetFlag()) return;

			// Check if there is a session
			if (session == null) {
				setUser(null);
				setPreviousSession(null);
				return;
			}

			// Check same session
			if (previousSession != null && previousSession.access_token == session.access_token) {
				return;
			}

			setLoading(true);

			// Update previous session
			setPreviousSession(session);

			// Get user from session
			const authUser = session.user;

			try {
				// Get user from DB
				const user = await getUser(authUser.id, session.access_token);

				// Update user
				setUser(user);

				// Check different email
				if (user != null && authUser.email != undefined && user.email !== authUser.email) {
					try {
						// Update user email in DB
						await updateUserEmail(authUser.id, authUser.email);

						console.log("User email updated.");
					} catch (err) {
						console.log("Error updating user email in DB.", err);
					} finally {
						setLoading(false);
					}
				}
			} catch (err) {
				if (checkAxiosError(err) && getAxiosErrorMessage(err) === "user/not-found") {
					try {
						// Create user
						const user = await createUser(session.access_token);
						console.log(user);
						setUser(user);

						// Remove new user flag
						removeNewUserFlag();

						// Navigate to create subscription page
						navigate("/profile/subscription");

						setLoading(false);
					} catch (e) {
						console.log("Error creating user.", e);
					}
				} else {
					console.log("Error fetching user from DB.", err);
				}
			} finally {
				setLoading(false);
			}
		});

		return () => data.subscription.unsubscribe();
	}, [previousSession, user, setUser, setLoading, navigate]);
};

export default useAuth;
