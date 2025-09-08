import { useMutation } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import getCompletionQuestionPrivate from "../services/getCompletionQuestionPrivate";
import { CompletionQuestionPrivate } from "../types/completionQuestionTypes";

type GetCompletionQuestionPrivateVariables = {
	quizId: string;
	completionId: string;
	questionId: string;
};

const useCompletionQuestionPrivate = () => {
	// #region Hooks
	const { setError } = useError();
	// #endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		CompletionQuestionPrivate,
		unknown,
		GetCompletionQuestionPrivateVariables
	>({
		mutationFn: getCompletionQuestionPrivate,
		onError: (err) => {
			setError(err);
		},
	});
	// #endregion

	return { mutateAsync, loading: isPending };
};

export default useCompletionQuestionPrivate;
