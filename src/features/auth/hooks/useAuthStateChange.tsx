import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../../config/supabase";
// Hooks
import { useQueryClient } from "@tanstack/react-query";
// Functions
import getPasswordResetFlag from "../utils/getPasswordResetFlag";

const useAuthStateChange = () => {
	// #region States
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Hooks
	const queryClient = useQueryClient();
	// #endregion

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
			console.log(event);
			// console.log(session?.access_token);

			setLoading(true);

			// Ignore password recovery event -> user must not be fetched
			if (currentSession == null || event === "PASSWORD_RECOVERY" || getPasswordResetFlag()) {
				// Update session
				setSession(null);

				// Remove queries
				queryClient.removeQueries();

				setLoading(false);
				return;
			}

			// Check same session
			if (currentSession.access_token === session?.access_token) {
				setLoading(false);
				return;
			}

			// Update session
			setSession(currentSession);

			if (event !== "TOKEN_REFRESHED") {
				setLoading(false);
			}
		});

		return () => data.subscription.unsubscribe();
	}, [session, queryClient]);

	return { session, setSession, loading };
};

export default useAuthStateChange;
