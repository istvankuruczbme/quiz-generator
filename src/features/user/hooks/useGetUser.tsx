import { useQuery } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import useAuth from "../../auth/contexts/AuthContext/useAuth";
import getUser from "../services/getUser";
import { useEffect } from "react";

function useGetUser() {
	//#region Hooks
	const { session, loading: loadingSession } = useAuth();
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: session != null,
		queryKey: ["users", session?.user.id],
		queryFn: getUser,
	});
	// #endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	// #endregion

	return { user: data ?? null, loading: loadingSession || isLoading };
}

export default useGetUser;
