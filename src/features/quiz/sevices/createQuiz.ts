import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";

export default async function createQuiz(
	title: string,
	description: string,
	photo: File | undefined,
	categoryId: string
): Promise<{ id: string }> {
	// Get session token
	const token = await getAuthToken();

	// Create form data
	const quizData = new FormData();
	quizData.append("data", JSON.stringify({ title, description, categoryId }));
	if (photo != undefined) quizData.append("file", photo);

	// Create quiz
	const { data } = await axios.post<{ id: string }>("/quizzes", quizData, {
		headers: {
			Authorization: createBearerAuthHeader(token),
			"Content-Type": "multipart/form-data",
		},
	});

	// Return quiz data
	return data;
}
