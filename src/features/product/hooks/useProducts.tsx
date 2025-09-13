import { useQuery } from "@tanstack/react-query";
import getProducts from "../services/getProducts";
import useError from "../../error/hooks/useError";
import { useEffect } from "react";
import useUser from "../../../contexts/UserContext/useUser";

const useProducts = () => {
	//#region Hooks
	const { user } = useUser();
	const { setError } = useError();
	// #endregion

	//#region Query
	const { data, isLoading, error } = useQuery({
		enabled: user != null,
		queryKey: ["products"],
		queryFn: getProducts,
	});
	// #endregion

	// #region Error
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { products: data ?? [], loading: isLoading };
};

export default useProducts;
