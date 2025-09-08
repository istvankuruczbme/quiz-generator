import { useMutation } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import createCompletionQuestion from "../services/createCompletionQuestion";
import { CompletionQuestionPublic } from "../types/completionQuestionTypes";

type CreateCompletionQuestionVariables = {
	ids: { quizId: string; completionId: string };
	data: { selectedAnswerOptions: string[]; questionId: string };
};

const useCreateCompletionQuestion = () => {
	// #region Hooks
	const { setError } = useError();
	// #endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		CompletionQuestionPublic,
		unknown,
		CreateCompletionQuestionVariables
	>({
		mutationFn: ({ ids, data }) => createCompletionQuestion(ids, data),
		onError: (err) => {
			setError(err);
		},
	});
	// #endregion

	return { mutateAsync, loading: isPending };
};

export default useCreateCompletionQuestion;
