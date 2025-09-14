import { useMutation, useQueryClient } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import { CompletionPublic } from "../types/completionTypes";
import finishCompletion from "../services/finishCompletion";

type FinishCompletionVariables = {
	quizId: string;
	completionId: string;
};

const useFinishCompletion = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		CompletionPublic,
		unknown,
		FinishCompletionVariables
	>({
		mutationFn: finishCompletion,
		onSuccess: (completion) => {
			// Update user completions query
			queryClient.setQueryData(
				["users", completion.user.id, "completions"],
				(completions?: CompletionPublic[]) => {
					if (!completions) return;
					return [...completions, completion];
				}
			);
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { mutateAsync, loading: isPending };
};

export default useFinishCompletion;
