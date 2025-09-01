import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "../../../contexts/UserContext/useUser";
import useError from "../../error/hooks/useError";
import deleteQuestion from "../services/deleteQuestion";
import { QuizPrivate, QuizSummary } from "../../quiz/types/quizTypes";

type DeleteQuestionVariables = {
	quizId: string;
	questionId: string;
};

const useDeleteQuestion = () => {
	// #region Hooks
	const { user } = useUser();
	const queryClient = useQueryClient();
	const { setError } = useError();
	// #endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<void, unknown, DeleteQuestionVariables>({
		mutationFn: deleteQuestion,
		onSuccess: (_, { quizId, questionId }) => {
			// Update quiz query
			queryClient.setQueryData(["users", user?.id, "quizzes", quizId], (quiz?: QuizPrivate) => {
				if (!quiz) return;
				return {
					...quiz,
					questions: quiz.questions
						.filter((question) => question.id !== questionId)
						.map((question, i) => ({ ...question, order: i + 1 })),
				};
			});

			// Update user quizzes query
			queryClient.setQueryData(["user", user?.id, "quizzes"], (quizzes?: QuizSummary[]) => {
				if (!quizzes) return;
				return quizzes.map((quiz) => {
					if (quiz.id !== quizId) return { ...quiz, questionCount: quiz.questionCount - 1 };
					return quiz;
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

export default useDeleteQuestion;
