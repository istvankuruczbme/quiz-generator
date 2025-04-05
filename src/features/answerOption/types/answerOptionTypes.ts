export type AnswerOptionPublic = Readonly<{
	id: string;
	text: string;
}>;

export type AnswerOptionPrivate = Readonly<{
	id: string;
	text: string;
	isCorrect: boolean;
}>;

export type AnswerOptionEditableProperty = keyof Omit<AnswerOptionPrivate, "id">;
