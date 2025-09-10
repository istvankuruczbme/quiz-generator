import { CompletionQuestionPrivate } from "../../completionQuestion/types/completionQuestionTypes";
import calculateCompletionQuestionPoints from "../../completionQuestion/utils/calculateCompletionQuestionPoints";

export default function calculateCompletionPoints(questions: CompletionQuestionPrivate[]): number {
	return questions.reduce(
		(total, question) => total + calculateCompletionQuestionPoints(question),
		0
	);
}
