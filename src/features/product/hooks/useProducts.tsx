import { useQuery } from "@tanstack/react-query";
import getProducts from "../services/getProducts";
import useError from "../../error/hooks/useError";
import useAuth from "../../auth/contexts/AuthContext/useAuth";

const useProducts = () => {
	//#region Hooks
	const { session } = useAuth();
	const { setError } = useError();
	// #endregion

	//#region Query
	const { data, isLoading, error } = useQuery({
		enabled: session != null,
		queryKey: ["products"],
		queryFn: getProducts,
	});
	// #endregion

	// #region Error
	if (error) setError(error);
	//#endregion

	return { products: data ?? [], loading: isLoading };
};

export default useProducts;
