import { useMutation, useQueryClient } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import { QuizPrivate, QuizSummary } from "../types/quizTypes";
import finishQuiz from "../sevices/finishQuiz";
import useUser from "../../../contexts/UserContext/useUser";

const useFinishQuiz = () => {
	// #region Hooks
	const { user } = useUser();
	const queryClient = useQueryClient();
	const { setError } = useError();
	// #endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<QuizPrivate, unknown, string>({
		mutationFn: finishQuiz,
		onSuccess: (quiz) => {
			// Update quiz query
			queryClient.setQueryData(["users", user?.id, "quizzes", quiz.id], quiz);

			// Update user quizzes
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

export default useFinishQuiz;
