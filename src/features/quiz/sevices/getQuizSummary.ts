import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import addIconToCategory from "../../category/utils/addIconToCategory";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { QuizSummary } from "../types/quizTypes";

export default async function getQuizSummary(quizId: string): Promise<QuizSummary> {
	// Get session token
	const token = await getAuthToken();

	// Get quiz summary
	const { data } = await axios.get<QuizSummary>(`/quizzes/${quizId}/summary`, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});

	// Add category icon to quiz category
	const category = addIconToCategory(data.category);

	// Return quiz full
	return {
		...data,
		category,
	};

	// Return quiz summary
	return data;
}
