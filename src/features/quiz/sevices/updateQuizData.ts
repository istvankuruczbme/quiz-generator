import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function updateQuizData(
	quizId: string,
	title: string,
	description: string,
	photo: File | undefined,
	categoryId: string
): Promise<void> {
	// Get auth token
	const token = await getAuthToken();

	// Create form data
	const quizData = new FormData();
	quizData.append("data", JSON.stringify({ title, description, categoryId }));
	if (photo != null) quizData.append("file", photo);

	// Update quiz data
	await axios.put(`/quizzes/${quizId}`, quizData, {
		headers: {
			Authorization: createBearerAuthHeader(token),
		},
	});
}
