import { useMutation } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import deleteUser from "../services/deleteUser";

const useDeleteUser = () => {
	//#region Hooks
	const { setError } = useError();
	// #endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation({
		mutationFn: deleteUser,
		onError: (err) => {
			setError(err);
		},
	});
	// #endregion

	return { mutateAsync, loading: isPending };
};

export default useDeleteUser;
