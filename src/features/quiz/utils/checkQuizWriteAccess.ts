import { UserProfile } from "../../user/types/userTypes";
import { QuizSummary } from "../types/quizTypes";

export default function checkQuizWriteAccess(quiz: QuizSummary, user: UserProfile): boolean {
	return quiz.user.id === user.id && quiz.config.state === "DRAFT";
}
