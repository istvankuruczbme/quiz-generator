import { useMutation, useQueryClient } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import { QuizPrivate, QuizSummary } from "../types/quizTypes";
import { EditQuizData } from "../utils/validation/schemas/editQuizDataSchema";
import updateQuizData from "../sevices/updateQuizData";

type UpdateQuizDataVariables = {
	id: string;
	data: EditQuizData;
};

const useUpdateQuizData = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	// #endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<QuizPrivate, unknown, UpdateQuizDataVariables>({
		mutationFn: ({ id, data }) => updateQuizData(id, data),
		onSuccess: (quiz) => {
			// Update quiz query
			queryClient.setQueryData(["users", quiz.user.id, "quizzes", quiz.id], quiz);

			// Update user quizzes
			queryClient.setQueryData(["users", quiz.user.id, "quizzes"], (quizzes?: QuizSummary[]) => {
				if (!quizzes) return;
				return quizzes.map((q) => {
					if (q.id === quiz.id) {
						const { questions, ...restQuiz } = quiz;
						return { ...restQuiz, questionCount: questions.length };
					}
					return q;
				});
			});
		},
		onError: (err) => {
			setError(err);
		},
	});
	// #endregion

	return { mutateAsync, loading: isPending };
};

export default useUpdateQuizData;
