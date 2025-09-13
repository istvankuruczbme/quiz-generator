import { axios } from "../../../config/axios";
import getSession from "../../auth/services/getSession";
import addIconToCategory from "../../category/utils/addIconToCategory";
import createBearerAuthHeader from "../../user/utils/createBearerAuthHeader";
import { CompletionPublic } from "../types/completionTypes";

export default async function getUserCompletions(): Promise<CompletionPublic[]> {
	// Get session
	const session = await getSession();

	// Send request
	const { data: completionsRaw } = await axios.get<CompletionPublic[]>(
		`/users/${session.user.id}/completions`,
		{ headers: { Authorization: createBearerAuthHeader(session.access_token) } }
	);

	// Add icons to quizzes
	const completions = completionsRaw.map((completion) => {
		const category = addIconToCategory(completion.quiz.category);
		return { ...completion, quiz: { ...completion.quiz, category } };
	});

	// Return completions
	return completions;
}
