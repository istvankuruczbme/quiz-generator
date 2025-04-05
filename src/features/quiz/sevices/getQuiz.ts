import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import addIconToCategory from "../../category/utils/addIconToCategory";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { QuizFullPrivate } from "../types/quizTypes";

export default async function getQuiz(quizId: string): Promise<QuizFullPrivate> {
	// Get session token
	const token = await getAuthToken();

	// Get quiz full
	const { data } = await axios.get<QuizFullPrivate>(`/quizzes/${quizId}`, {
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
}
