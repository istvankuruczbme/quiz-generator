import getUserCategories from "../services/getUserCategories";
import useError from "../../error/hooks/useError";
import useAuth from "../../auth/contexts/AuthContext/useAuth";
import { useQuery } from "@tanstack/react-query";

const useUserCategories = () => {
	// #region Hooks
	const { session } = useAuth();
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: session != null,
		queryKey: ["users", session?.user.id, "categories"],
		queryFn: getUserCategories,
	});
	// #endregion

	// #region Error handling
	if (error) setError(error);
	//#endregion

	return { categories: data ?? [], loading: isLoading };
};

export default useUserCategories;
