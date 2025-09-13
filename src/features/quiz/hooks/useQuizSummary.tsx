import { useParams } from "react-router-dom";
import getQuizSummary from "../sevices/getQuizSummary";
import useError from "../../error/hooks/useError";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../../contexts/UserContext/useUser";
import { useEffect } from "react";

const useQuizSummary = () => {
	// #region Hooks
	const { user, loading: loadingUser } = useUser();
	const { setError } = useError();
	const { quizId } = useParams();
	// #endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: user != null && quizId != undefined,
		queryKey: ["quizzes", quizId, "summary"],
		queryFn: () => getQuizSummary(quizId!),
	});
	// #endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	// #endregion

	return { quizSummary: data ?? null, loading: isLoading || loadingUser };
};

export default useQuizSummary;
