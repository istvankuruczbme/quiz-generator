import { ChangeEvent, FC, ReactNode, useState } from "react";
import EditQuestionContext from "./EditQuestionContext";
import {
	AnswerOptionEditableProperty,
	AnswerOptionPrivate,
} from "../../../answerOption/types/answerOptionTypes";
import { QuestionPrivate } from "../../types/questionTypes";
import getDefaultAnswerOption from "../../../answerOption/utils/getDefaultAnswerOption";

type EditQuestionProviderProps = {
	question?: QuestionPrivate;
	children: ReactNode;
};

const EditQuestionProvider: FC<EditQuestionProviderProps> = ({ question, children }) => {
	// #region States
	const [text, setText] = useState(question?.text || "");
	const [photoUrl, setPhotoUrl] = useState(question?.photoUrl || "");
	const [correct, setCorrect] = useState(question?.points.correct || 1);
	const [wrong, setWrong] = useState(question?.points.wrong || 0);
	const [empty, setEmpty] = useState(question?.points.empty || 0);
	const [answerOptions, setAnswerOptions] = useState<AnswerOptionPrivate[]>(
		structuredClone(question?.answerOptions) || []
	);
	// #endregion

	// #region Functions
	function addAnswerOption(): void {
		setAnswerOptions((options) => [...options, getDefaultAnswerOption()]);
	}

	function updateAnswerOption(
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		id: string,
		property: AnswerOptionEditableProperty
	): void {
		const newAnswerOptions = answerOptions.map((option) => {
			// Check same option
			if (option.id === id) {
				switch (property) {
					case "text":
						if (e.target instanceof HTMLTextAreaElement) {
							option.text = e.target.value;
						}
						break;
					case "isCorrect":
						if (e.target instanceof HTMLInputElement) {
							option.isCorrect = e.target.checked;
						}
						break;
				}
			}

			// Return option
			return option;
		});
		setAnswerOptions(newAnswerOptions);
	}

	function removeAnswerOption(id: string): void {
		const newAnswerOptions = answerOptions.filter((option) => option.id !== id);
		setAnswerOptions(newAnswerOptions);
	}
	//#endregion

	return (
		<EditQuestionContext.Provider
			value={{
				question,
				text,
				setText,
				photoUrl,
				setPhotoUrl,
				correct,
				setCorrect,
				wrong,
				setWrong,
				empty,
				setEmpty,
				answerOptions,
				setAnswerOptions,
				addAnswerOption,
				updateAnswerOption,
				removeAnswerOption,
			}}
		>
			{children}
		</EditQuestionContext.Provider>
	);
};

export default EditQuestionProvider;
