import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "../../../contexts/UserContext/useUser";
import useError from "../../error/hooks/useError";
import { EditQuestionData, QuestionPrivate } from "../types/questionTypes";
import updateQuestion from "../services/updateQuestion";
import { QuizPrivate } from "../../quiz/types/quizTypes";

type UpdateQuestionVariables = {
	ids: { quizId: string; questionId: string };
	data: EditQuestionData;
};

const useUpdateQuestion = () => {
	// #region Hooks
	const { user } = useUser();
	const queryClient = useQueryClient();
	const { setError } = useError();
	// #endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		QuestionPrivate,
		unknown,
		UpdateQuestionVariables
	>({
		mutationFn: ({ ids, data }) => updateQuestion(ids, data),
		onSuccess: (question, { ids: { quizId } }) => {
			// Update quiz query
			queryClient.setQueryData(["users", user?.id, "quizzes", quizId], (quiz?: QuizPrivate) => {
				if (!quiz) return;
				return {
					...quiz,
					questions: quiz.questions.map((q) => (q.id === question.id ? question : q)),
				};
			});
		},
		onError: (err) => {
			setError(err);
		},
	});
	// #endregion

	return { mutateAsync, loading: isPending };
};

export default useUpdateQuestion;
