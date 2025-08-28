import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateUserCategories from "../services/updateUserCategories";
import { Category } from "../../category/types/categoryTypes";
import useUser from "../../../contexts/UserContext/useUser";
import useError from "../../error/hooks/useError";

type UpdateUserCategoriesVariables = {
	categoryIds: string[];
};

const useUpdateUserCategories = () => {
	// #region Hooks
	const { user } = useUser();
	const { setError } = useError();
	const queryClient = useQueryClient();
	// #endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		Category[],
		unknown,
		UpdateUserCategoriesVariables
	>({
		mutationFn: updateUserCategories,
		onSuccess: (categories) => {
			// Update user categories query
			queryClient.setQueryData(["users", user?.id, "categories"], categories);
		},
		onError: (err) => {
			setError(err);
		},
	});
	// #endregion

	return { mutateAsync, loading: isPending };
};

export default useUpdateUserCategories;
