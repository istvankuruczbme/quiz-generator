import { useMutation, useQueryClient } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import { NewQuestionData, QuestionPrivate } from "../types/questionTypes";
import createQuestion from "../services/createQuestion";
import useUser from "../../../contexts/UserContext/useUser";
import { QuizPrivate, QuizSummary } from "../../quiz/types/quizTypes";

type NewQuestionVariables = {
	quizId: string;
	data: NewQuestionData;
};

const useCreateQuestion = () => {
	// #region Hooks
	const { user } = useUser();
	const queryClient = useQueryClient();
	const { setError } = useError();
	// #endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<QuestionPrivate, unknown, NewQuestionVariables>({
		mutationFn: ({ quizId, data }) => createQuestion(quizId, data),
		onSuccess: (question, { quizId }) => {
			// Update quiz query
			queryClient.setQueryData(["users", user?.id, "quizzes", quizId], (quiz?: QuizPrivate) => {
				if (!quiz) return;
				return { ...quiz, questions: [...quiz.questions, question] };
			});

			// Update user quizzes
			queryClient.setQueryData(["users", user?.id, "quizzes"], (quizzes?: QuizSummary[]) => {
				if (!quizzes) return;
				return quizzes.map((quiz) => {
					if (quiz.id !== quizId) return { ...quiz, questionCount: quiz.questionCount + 1 };
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

export default useCreateQuestion;
