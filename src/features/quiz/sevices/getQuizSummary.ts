import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import addIconToCategory from "../../category/utils/addIconToCategory";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { QuizSummary } from "../types/quizTypes";

export default async function getQuizSummary(id: string): Promise<QuizSummary> {
	// Get session token
	const token = await getAuthToken();

	// Get quiz summary
	const { data: quizSummary } = await axios.get<QuizSummary>(`/quizzes/${id}/summary`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Add category icon to quiz category
	const category = addIconToCategory(quizSummary.category);

	// Return quiz full
	return {
		...quizSummary,
		category,
	};
}
