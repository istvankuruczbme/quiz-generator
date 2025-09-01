import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "../../../contexts/UserContext/useUser";
import useError from "../../error/hooks/useError";
import deleteQuiz from "../sevices/deleteQuiz";
import { QuizSummary } from "../types/quizTypes";

const useDeleteQuiz = () => {
	// #region Hooks
	const { user } = useUser();
	const queryClient = useQueryClient();
	const { setError } = useError();
	// #endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<void, unknown, string>({
		mutationFn: deleteQuiz,
		onSuccess: (_, id) => {
			// Remove quiz query
			// queryClient.removeQueries({ queryKey: ["users", user?.id, "quizzes", id] });
			queryClient.setQueryData(["users", user?.id, "quizzes", id], null);

			// Update user quizzes
			queryClient.setQueryData(["users", user?.id, "quizzes"], (quizzes?: QuizSummary[]) => {
				if (!quizzes) return;
				return quizzes.filter((quiz) => quiz.id !== id);
			});
		},
		onError: (err) => {
			setError(err);
		},
	});
	// #endregion

	return { mutateAsync, loading: isPending };
};

export default useDeleteQuiz;
