const quizVisibilityOptions = [
	{
		value: "PUBLIC",
		text: "Public",
	},
	{
		value: "PRIVATE",
		text: "Private",
	},
] as const;

export default quizVisibilityOptions;

export type QuizVisibility = (typeof quizVisibilityOptions)[number]["value"];
