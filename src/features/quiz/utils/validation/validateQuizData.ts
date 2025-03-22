import validateNonEmptyString from "../../../../utils/validation/validateNonEmptyString";

export default function validateQuizData(
	title: string | undefined,
	description: string | undefined,
	categoryId: string | undefined
): void {
	validateNonEmptyString(title, "quiz/title-");
	validateNonEmptyString(description, "quiz/desctiption-");
	validateNonEmptyString(categoryId, "quiz/catagory-");
}
