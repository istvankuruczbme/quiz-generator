import { useMutation, useQueryClient } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import { UserProfile } from "../types/userTypes";
import updateUser from "../services/updateUser";

type UpdateUserVariables = Partial<{
	name: string;
	photoUrl: string | null;
	photo: File | null;
}>;

function useUpdateUser() {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<UserProfile, unknown, UpdateUserVariables>({
		mutationFn: updateUser,
		onSuccess: (user) => {
			// Update user query
			queryClient.setQueryData(["users", user.id], user);
		},
		onError: (err) => {
			setError(err);
		},
	});
	// #endregion

	return { mutateAsync, loading: isPending };
}

export default useUpdateUser;
