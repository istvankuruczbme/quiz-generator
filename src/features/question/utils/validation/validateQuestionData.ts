import validateNonEmptyString from "../../../../utils/validation/validateNonEmptyString";
import { AnswerOptionPrivate } from "../../../answerOption/types/answerOptionTypes";

export default function validateQuestionData(
	text: string | undefined,
	answerOptions: AnswerOptionPrivate[]
): void {
	// Question text
	validateNonEmptyString(text, "question/text-");

	// Answer options' text
	for (const option of answerOptions) {
		validateNonEmptyString(option.text, "question/answer-option-text-");
	}

	// Number of correct answers
	const correctAnswers = answerOptions.filter((option) => option.isCorrect);
	if (correctAnswers.length === 0) throw new Error("question/correct-answer-option-missing");
}
