import { useParams } from "react-router-dom";
import useError from "../../error/hooks/useError";
import { useQuery } from "@tanstack/react-query";
import getCompletionPrivate from "../services/getCompletionPrivate";

const useGetCompletionPrivate = () => {
	//#region Hooks
	const { quizId, completionId } = useParams();
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: quizId != undefined && completionId != undefined,
		queryKey: ["quizzes", quizId, "completions", completionId, "private"],
		queryFn: () => getCompletionPrivate({ quizId: quizId!, completionId: completionId! }),
	});
	//#endregion

	//#region Error handling
	if (error) setError(error);
	//#endregion

	return { completion: data ?? null, loading: isLoading };
};

export default useGetCompletionPrivate;
