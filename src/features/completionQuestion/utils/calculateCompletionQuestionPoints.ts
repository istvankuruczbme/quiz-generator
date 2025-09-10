import checkSameArrayElements from "../../../utils/array/checkSameArrayElements";
import { CompletionQuestionPrivate } from "../types/completionQuestionTypes";

export default function calculateCompletionQuestionPoints(
	question: CompletionQuestionPrivate
): number {
	// Get IDs of correct answer options
	const correctAnswerOptionIds = question.answerOptions
		.filter((option) => option.isCorrect)
		.map((option) => option.id);

	// Correct
	if (
		checkSameArrayElements(question.completion.selectedAnswerOptionIds, correctAnswerOptionIds)
	) {
		return question.points.correct;
	}

	// Partially correct
	if (
		question.completion.selectedAnswerOptionIds.some((optionId) =>
			correctAnswerOptionIds.includes(optionId)
		)
	) {
		return question.points.empty;
	}

	// Wrong
	if (
		question.completion.selectedAnswerOptionIds.every(
			(optionId) => !correctAnswerOptionIds.includes(optionId)
		)
	) {
		return question.points.wrong;
	}

	// Default
	return 0;
}
