import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useUser from "../../../contexts/UserContext/useUser";
import getQuizPrivate from "../sevices/getQuizPrivate";
import useError from "../../error/hooks/useError";

const useGetQuizPrivate = () => {
	//#region Hooks
	const { user, loading: loadingUser } = useUser();
	const { quizId } = useParams();
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: quizId != undefined && user != null,
		queryKey: ["users", user?.id, "quizzes", quizId],
		queryFn: () => getQuizPrivate(quizId!),
	});
	// #endregion

	// #region Error handling
	if (error) setError(error);
	// #endregion

	return { quiz: data ?? null, loading: loadingUser || isLoading };
};

export default useGetQuizPrivate;
