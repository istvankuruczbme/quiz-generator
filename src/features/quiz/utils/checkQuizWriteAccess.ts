import { UserProfile } from "../../user/types/userTypes";
import { QuizSummary } from "../types/quizTypes";

export default function checkQuizWriteAccess(
	quiz: QuizSummary | null,
	user: UserProfile | null
): boolean {
	if (quiz == null || user == null) return false;
	return quiz.user.id === user.id && quiz.config.state === "DRAFT";
}
