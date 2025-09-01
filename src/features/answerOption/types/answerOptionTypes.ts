// #region Answer option public
export type AnswerOptionPublic = Readonly<{
	id: string;
	text: string;
}>;
// #endregion

// #region Answer option private
export type AnswerOptionPrivate = Readonly<{
	id: string;
	text: string;
	isCorrect: boolean;
}>;
// #endregion

// #region Answer option
export type AnswerOption = {
	id: string;
	text: string;
	isCorrect: boolean;
};
export type AnswerOptionData = {
	text: string;
	isCorrect: boolean;
};
// #endregion

export type AnswerOptionEditableProperty = keyof Omit<AnswerOptionPrivate, "id">;
