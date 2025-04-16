import validateNonEmptyString from "../../../../utils/validation/validateNonEmptyString";

export default function validateQuizData(
	title: string | undefined,
	description: string | undefined,
	categoryId: string | undefined
): void {
	validateNonEmptyString(title, "quiz/title-");
	validateNonEmptyString(description, "quiz/description-");
	validateNonEmptyString(categoryId, "quiz/catagory-");
}
