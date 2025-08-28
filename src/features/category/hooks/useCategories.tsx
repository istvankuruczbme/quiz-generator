import useAuth from "../../auth/contexts/AuthContext/useAuth";
import useError from "../../error/hooks/useError";
import getCategories from "../services/getCategories";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
	//#region Hooks
	const { session } = useAuth();
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: session != null,
		queryKey: ["categories"],
		queryFn: getCategories,
	});
	// #endregion

	// #region Error handling
	if (error) setError(error);
	// #endregion

	return { categories: data ?? [], loading: isLoading };
};

export default useCategories;
