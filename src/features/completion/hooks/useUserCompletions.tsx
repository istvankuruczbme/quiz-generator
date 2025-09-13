import { useQuery } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import useUser from "../../../contexts/UserContext/useUser";
import getUserCompletions from "../services/getUserCompletions";
import { useEffect } from "react";

const useUserCompletions = () => {
	//   #region Hooks
	const { user, loading: loadingUser } = useUser();
	const { setError } = useError();
	// #endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: user != null,
		queryKey: ["users", user?.id, "completions"],
		queryFn: getUserCompletions,
	});
	// #endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	// #endregion

	return { completions: data ?? [], loading: isLoading || loadingUser };
};

export default useUserCompletions;
