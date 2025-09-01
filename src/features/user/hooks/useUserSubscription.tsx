import getUserSubscription from "../services/getUserSubscription";
import { useQuery } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import useUser from "../../../contexts/UserContext/useUser";

const useUserSubscription = () => {
	// #region Hooks
	const { user } = useUser();
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
	if (error) setError(error);
	// #endregion

	return { subscription: data ?? null, loading: isLoading };
};

export default useUserSubscription;
