import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import addIconToCategory from "../../category/utils/addIconToCategory";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { QuizSummary } from "../types/quizTypes";

export default async function searchQuizzes(searchData: {
	searchText?: string;
	categoryIds?: string[];
	limit: number;
}): Promise<QuizSummary[]> {
	// Get search data
	const { searchText, categoryIds, limit } = searchData;

	// Get session token
	const token = await getAuthToken();

	// Create search params
	const params = new URLSearchParams();
	if (searchText) params.append("searchText", searchText);
	if (categoryIds) params.append("categoryIds", JSON.stringify(categoryIds));
	params.append("limit", limit.toString());

	// Send request
	const { data: quizzesRaw } = await axios.get<QuizSummary[]>(
		`/quizzes/search?${params.toString()}`,
		{
			headers: { Authorization: createBearerAuthHeader(token) },
		}
	);

	// Add icon to quiz category
	const quizzes = quizzesRaw.map((quiz) => {
		const category = addIconToCategory(quiz.category);
		return { ...quiz, category };
	});

	// Return quizzes
	return quizzes;
}
