import { ChangeEvent, FC, ReactNode, useEffect } from "react";
import EditQuestionContext from "./EditQuestionContext";
import { AnswerOptionEditableProperty } from "../../../answerOption/types/answerOptionTypes";
import { QuestionPrivate } from "../../types/questionTypes";
import getDefaultAnswerOption from "../../../answerOption/utils/getDefaultAnswerOption";
import useFormData from "../../../../hooks/form/useFormData";
import { EDIT_QUESTION_FORM_DATA } from "../../constants/formData";

type EditQuestionProviderProps = {
	question?: QuestionPrivate;
	children: ReactNode;
};

const EditQuestionProvider: FC<EditQuestionProviderProps> = ({ question, children }) => {
	// #region States
	const [data, updateData] = useFormData(EDIT_QUESTION_FORM_DATA);
	// #endregion

	useEffect(() => {
		// No question
		if (!question) {
			updateData(EDIT_QUESTION_FORM_DATA);
			return;
		}

		// Update form data with question data
		updateData({
			text: question.text,
			photoUrl: question.photoUrl,
			correct: question.points.correct.toString(),
			wrong: question.points.wrong.toString(),
			empty: question.points.empty.toString(),
			answerOptions: question.answerOptions,
		});
	}, [question, updateData]);

	// #region Functions
	function addAnswerOption() {
		updateData({ answerOptions: [...data.answerOptions, getDefaultAnswerOption()] });
	}

	function updateAnswerOption(
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		id: string,
		property: AnswerOptionEditableProperty
	) {
		const newAnswerOptions = data.answerOptions.map((option) => {
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

		updateData({ answerOptions: newAnswerOptions });
	}

	function removeAnswerOption(id: string): void {
		const newAnswerOptions = data.answerOptions.filter((option) => option.id !== id);
		updateData({ answerOptions: newAnswerOptions });
	}
	//#endregion

	return (
		<EditQuestionContext.Provider
			value={{
				question,
				data,
				updateData,
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
