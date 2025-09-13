import { useQuery } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import searchQuizzes from "../sevices/searchQuizzes";
import useUser from "../../../contexts/UserContext/useUser";
import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
	searchText: string;
	categoryIds: string[];
	limit: number;
	delay?: number;
};

const useSearchQuizzes = ({ searchText, categoryIds, limit, delay }: Props) => {
	// #region States
	const [searchParams, setSearchParams] = useSearchParams();
	// #endregion

	// #region Refs
	const timeoutRef = useRef<NodeJS.Timeout>(null);
	// #endregion

	//#region Hooks
	const { user, loading: loadingUser } = useUser();
	const { setError } = useError();

	useEffect(() => {
		// Clear timeout
		clearTimeout(timeoutRef?.current ?? undefined);

		// Set new timeout
		timeoutRef.current = setTimeout(() => {
			setSearchParams(
				{ searchText, categoryIds: JSON.stringify(categoryIds), limit: limit.toString() },
				{ replace: true }
			);
		}, delay ?? 500);
	}, [searchText, categoryIds, limit, delay, setSearchParams]);
	//#endregion

	// #region Constants
	const searchData = useMemo(() => {
		const searchText = searchParams.get("searchText") || undefined;
		const categoryIds = searchParams.get("categoryIds") ?? undefined;
		const limit = searchParams.get("limit") ?? "5";

		return {
			searchText,
			categoryIds: categoryIds ? (JSON.parse(categoryIds) as string[]) : undefined,
			limit: parseInt(limit),
		};
	}, [searchParams]);
	// #endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: user != null,
		queryKey: ["quizzes", "search", searchData],
		queryFn: () => searchQuizzes(searchData),
	});
	// #endregion

	// #region Error handling
	if (error) setError(error);
	//#endregion

	return { quizzes: data ?? [], loading: isLoading || loadingUser };
};

export default useSearchQuizzes;
