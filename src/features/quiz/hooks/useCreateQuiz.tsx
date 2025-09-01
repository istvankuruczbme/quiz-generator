import { useMutation, useQueryClient } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import createQuiz from "../sevices/createQuiz";
import useUser from "../../../contexts/UserContext/useUser";
import { QuizSummary } from "../types/quizTypes";

const useCreateQuiz = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { user } = useUser();
	const { setError } = useError();
	// #endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation({
		mutationFn: createQuiz,
		onSuccess: (quiz) => {
			// Create quiz query
			queryClient.setQueryData(["users", user?.id, "quizzes", quiz.id], quiz);

			// Update user quizzes query
			queryClient.setQueryData(["users", user?.id, "quizzes"], (quizzes?: QuizSummary[]) => {
				if (!quizzes) return;
				return [...quizzes, quiz];
			});
		},
		onError: (err) => {
			setError(err);
		},
	});
	// #endregion

	return { mutateAsync, loading: isPending };
};

export default useCreateQuiz;
