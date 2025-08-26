import { useQuery } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import useAuth from "../../auth/contexts/AuthContext/useAuth";
import getUser from "../services/getUser";

function useGetUser() {
	//#region Hooks
	const { session } = useAuth();
	const { setError } = useError();
	//#endregion

	// Fetch user
	const { data, isLoading, error } = useQuery({
		enabled: session != null,
		queryKey: ["users", session?.user.id],
		queryFn: getUser,
	});

	// Check error
	if (error) setError(error);

	return { user: data ?? null, loading: isLoading };
}

export default useGetUser;
