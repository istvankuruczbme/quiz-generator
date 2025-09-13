import getUserCategories from "../services/getUserCategories";
import useError from "../../error/hooks/useError";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../../contexts/UserContext/useUser";
import { useEffect } from "react";

const useUserCategories = () => {
	// #region Hooks
	const { user, loading: loadingUser } = useUser();
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: user != null,
		queryKey: ["users", user?.id, "categories"],
		queryFn: getUserCategories,
	});
	// #endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { categories: data ?? [], loading: isLoading || loadingUser };
};

export default useUserCategories;
