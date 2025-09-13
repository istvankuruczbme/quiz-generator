import { QuestionGenerationStrategy } from "../../question/constants/generation";
import questionOrderOptions, { QuestionOrder } from "../assets/questionOrder";
import quizVisibilityOptions, { QuizVisibility } from "../assets/quizVisibility";

// New quiz
export const NEW_QUIZ_FORM_DATA = {
	title: "",
	description: "",
	photo: null as File | null,
	categoryId: "",
};
export type NewQuizFormData = typeof NEW_QUIZ_FORM_DATA;

// Edit quiz data
export const EDIT_QUIZ_DATA_FORM_DATA = {
	title: "",
	description: "",
	photoUrl: null as string | null,
	photo: null as File | null,
	categoryId: "",
};
export type EditQuizDataFormData = typeof EDIT_QUIZ_DATA_FORM_DATA;

// Edit quiz config
export const EDIT_QUIZ_CONFIG_FORM_DATA = {
	visibility: quizVisibilityOptions[0].value as QuizVisibility,
	questionOrder: questionOrderOptions[0].value as QuestionOrder,
};
export type EditQuizConfigFormData = typeof EDIT_QUIZ_CONFIG_FORM_DATA;

// Edit quiz questions generation params
export const EDIT_QUIZ_QUESTION_GENERATION_FORM_DATA = {
	file: null as File | null,
	strategy: "TFIDF" as QuestionGenerationStrategy,
	creativity: 50,
	questionCount: "10",
	answerOptionCount: "3",
};
export type EditQuizQuestionGenerationFormData = typeof EDIT_QUIZ_QUESTION_GENERATION_FORM_DATA;

// Search quiz
export const SEARCH_QUIZ_FORM_DATA = {
	searchText: "",
	selectedCategories: [] as string[],
	limit: 5,
};
export type SearchQuizFormData = typeof SEARCH_QUIZ_FORM_DATA;
