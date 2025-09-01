import getUserQuizzes from "../sevices/getUserQuizzes";
import useAuth from "../../auth/contexts/AuthContext/useAuth";
import { useQuery } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";

const useUserQuizzes = () => {
	//#region Hooks
	const { session } = useAuth();
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: session != null,
		queryKey: ["users", session?.user.id, "quizzes"],
		queryFn: getUserQuizzes,
	});
	//#endregion

	// #region Error handling
	if (error) setError(error);
	// #endregion

	return { quizzes: data ?? [], loading: isLoading };
};

export default useUserQuizzes;
