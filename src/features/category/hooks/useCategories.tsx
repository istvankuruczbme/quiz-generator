import { useEffect } from "react";
import useUser from "../../../contexts/UserContext/useUser";
import useError from "../../error/hooks/useError";
import getCategories from "../services/getCategories";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
	//#region Hooks
	const { user, loading: loadingUser } = useUser();
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: user != null,
		queryKey: ["categories"],
		queryFn: getCategories,
	});
	// #endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	// #endregion

	return { categories: data ?? [], loading: isLoading || loadingUser };
};

export default useCategories;
