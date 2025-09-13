import getUserSubscription from "../services/getUserSubscription";
import { useQuery } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import useUser from "../../../contexts/UserContext/useUser";
import { useEffect } from "react";

const useUserSubscription = () => {
	// #region Hooks
	const { user, loading: loadingUser } = useUser();
	const { setError } = useError();
	// #endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: user != null && user.hasSubscription,
		queryKey: ["users", user?.id, "subscription"],
		queryFn: getUserSubscription,
	});
	// #endregion

	// #region Error
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	// #endregion

	return { subscription: data ?? null, loading: isLoading || loadingUser };
};

export default useUserSubscription;
