import getUserSubscription from "../services/getUserSubscription";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../auth/contexts/AuthContext/useAuth";
import useError from "../../error/hooks/useError";

const useUserSubscription = () => {
	// #region Hooks
	const { session } = useAuth();
	const { setError } = useError();
	// #endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: session != null,
		queryKey: ["users", session?.user.id, "subscription"],
		queryFn: getUserSubscription,
	});
	// #endregion

	// #region Error
	if (error) setError(error);
	// #endregion

	return { subscription: data ?? null, loading: isLoading };
};

export default useUserSubscription;
