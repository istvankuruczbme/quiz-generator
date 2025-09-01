import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "../../../contexts/UserContext/useUser";
import useError from "../../error/hooks/useError";
import updateQuizQuestionsOrder from "../services/updateQuizQuestionsOrder";
import { QuizPrivate, QuizSummary } from "../../quiz/types/quizTypes";

type UpdateQuestionsOrderVariables = {
	quizId: string;
	data: { questionIds: string[] };
};

const useUpdateQuestionsOrder = () => {
	// #region Hooks
	const { user } = useUser();
	const queryClient = useQueryClient();
	const { setError } = useError();
	// #endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		QuizPrivate,
		unknown,
		UpdateQuestionsOrderVariables
	>({
		mutationFn: ({ quizId, data }) => updateQuizQuestionsOrder(quizId, data),
		onSuccess: (quiz) => {
			// Update quiz query
			queryClient.setQueryData(["users", user?.id, "quizzes", quiz.id], quiz);

			// Update user quizzes
			queryClient.setQueryData(["users", user?.id, "quizzes"], (quizzes?: QuizSummary[]) => {
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

export default useUpdateQuestionsOrder;
