const questionOrderOptions = [
	{
		value: "NORMAL",
		text: "Normal",
	},
	{
		value: "RANDOM",
		text: "Random",
	},
] as const;

export default questionOrderOptions;

export type QuestionOrder = (typeof questionOrderOptions)[number]["value"];
