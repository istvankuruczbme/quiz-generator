import { useMutation, useQueryClient } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import createCompletion from "../services/createCompletion";
import { CompletionPublic } from "../types/completionTypes";

type CreateCompletionVariables = {
	quizId: string;
};

const useCreateCompletion = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	// #endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		CompletionPublic,
		unknown,
		CreateCompletionVariables
	>({
		mutationFn: createCompletion,
		onSuccess: (completion, { quizId }) => {
			// Create completion query
			queryClient.setQueryData(["quizzes", quizId, "completions", completion.id], completion);
		},
		onError: (err) => {
			setError(err);
		},
	});
	// #endregion

	return { mutateAsync, loading: isPending };
};

export default useCreateCompletion;
