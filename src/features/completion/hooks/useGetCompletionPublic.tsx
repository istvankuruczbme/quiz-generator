import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import getCompletionPublic from "../services/getCompletionPublic";
import useError from "../../error/hooks/useError";
import { useEffect } from "react";

const useGetCompletionPublic = () => {
	//#region Hooks
	const { quizId, completionId } = useParams();
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: quizId != undefined && completionId != undefined,
		queryKey: ["quizzes", quizId, "completions", completionId],
		queryFn: () => getCompletionPublic({ quizId: quizId!, completionId: completionId! }),
	});
	//#endregion

	//#region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { completion: data ?? null, loading: isLoading };
};

export default useGetCompletionPublic;
