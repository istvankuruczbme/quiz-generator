import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import useError from "../../error/hooks/useError";
import getSession from "../services/getSession";

const useAuthSession = () => {
	// #region States
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(false);
	//#endregion

	// #region Hooks
	const { setError } = useError();
	// #endregion

	useEffect(() => {
		(async function () {
			try {
				// Get session
				const session = await getSession();

				// Update session
				setSession(session);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		})();
	}, [setError]);

	return { session, loading };
};

export default useAuthSession;
