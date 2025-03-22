import { axios } from "../../../config/axios";
import getAuthToken from "../../auth/services/getAuthToken";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { Quiz } from "../types/quizTypes";

export default async function createQuiz(
	title: string,
	description: string,
	photo: File | undefined,
	categoryId: string
): Promise<Quiz> {
	// Get session token
	const token = await getAuthToken();

	// Create form data
	const quizData = new FormData();
	quizData.append("title", title);
	quizData.append("description", description);
	if (photo != undefined) quizData.append("file", photo);
	quizData.append("categoryId", categoryId);

	// Create quiz
	const { data } = await axios.post<Quiz>("/quizzes", quizData, {
		headers: {
			Authorization: createBearerAuthHeader(token),
			"Content-Type": "multipart/form-data",
		},
	});

	// Return quiz data
	return data;
}
