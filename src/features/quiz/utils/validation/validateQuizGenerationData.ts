import validateBoolean from "../../../../utils/validation/validateBoolean";
import validateInteger from "../../../../utils/validation/validateInteger";
import validateTextFile from "../../../../utils/validation/validateTextFile";

export default function validateQuizGenerationData(
	file: File | undefined,
	randomStrategy: boolean | undefined,
	questionCount: number,
	answerOptionCount: number
): void {
	validateTextFile(file, "quiz/generation/file");
	validateBoolean(randomStrategy, "quiz/generation/strategy");

	validateInteger(questionCount, "quiz/generation/question-count");
	if (questionCount < 1) throw new Error("quiz/generation/question-count-invalid");

	validateInteger(answerOptionCount, "quiz/generation/answer-option-count");
	if (answerOptionCount < 1) throw new Error("quiz/generation/answer-option-count-invalid");
}
