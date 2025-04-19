export type AnswerOptionPublic = Readonly<{
	id: string;
	text: string;
}>;

export type AnswerOptionPrivate = {
	id: string;
	text: string;
	isCorrect: boolean;
};

export type AnswerOptionEditableProperty = keyof Omit<AnswerOptionPrivate, "id">;
