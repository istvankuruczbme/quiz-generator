import { useMutation, useQueryClient } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import generateQuestions from "../services/generateQuestions";
import { EditQuizQuestionGenerationData } from "../../quiz/utils/validation/schemas/editQuizQuestionGenerationSchema";
import { QuizPrivate, QuizSummary } from "../../quiz/types/quizTypes";

type GenerateQuestionsVariables = {
	quizId: string;
	data: EditQuizQuestionGenerationData;
};

const useGenerateQuestions = () => {
	//#region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<QuizPrivate, unknown, GenerateQuestionsVariables>(
		{
			mutationFn: ({ quizId, data }) => generateQuestions(quizId, data),
			onSuccess: (quiz) => {
				// Update quiz query
				queryClient.setQueryData(["users", quiz.user.id, "quizzes", quiz.id], quiz);

				// Update user quizzes
				queryClient.setQueryData(
					["users", quiz.user.id, "quizzes"],
					(quizzes?: QuizSummary[]) => {
						if (!quizzes) return;
						return quizzes.map((q) => {
							if (q.id === quiz.id) {
								const { questions, ...restQuiz } = quiz;
								return { ...restQuiz, questionCount: questions.length };
							}
							return q;
						});
					}
				);
			},
			onError: (err) => {
				setError(err);
			},
		}
	);
	// #endregion

	return { mutateAsync, loading: isPending };
};

export default useGenerateQuestions;
