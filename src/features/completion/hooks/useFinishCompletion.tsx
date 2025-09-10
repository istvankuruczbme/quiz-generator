import { useMutation } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import { CompletionPublic } from "../types/completionTypes";
import finishCompletion from "../services/finishCompletion";

type FinishCompletionVariables = {
	quizId: string;
	completionId: string;
};

const useFinishCompletion = () => {
	// #region Hooks
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		CompletionPublic,
		unknown,
		FinishCompletionVariables
	>({
		mutationFn: finishCompletion,
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { mutateAsync, loading: isPending };
};

export default useFinishCompletion;
