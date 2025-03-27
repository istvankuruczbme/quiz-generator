import validateNumber from "../../../../utils/validation/validateNumber";

export default function validateQuestionPointsData(
	correct: number,
	wrong: number,
	empty: number
): void {
	validateNumber(correct, "question/correct-points-");
	validateNumber(wrong, "question/wrong-points-");
	validateNumber(empty, "question/empty-points-");
}
