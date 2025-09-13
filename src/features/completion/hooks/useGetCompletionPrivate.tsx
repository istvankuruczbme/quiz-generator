import { useParams } from "react-router-dom";
import useError from "../../error/hooks/useError";
import { useQuery } from "@tanstack/react-query";
import getCompletionPrivate from "../services/getCompletionPrivate";
import { useEffect } from "react";

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
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { completion: data ?? null, loading: isLoading };
};

export default useGetCompletionPrivate;
