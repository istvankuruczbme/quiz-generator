import { ChangeEvent, useState } from "react";
import { AnswerOptionEditableProperty, AnswerOptionPrivate } from "../types/answerOptionTypes";
import getDefaultAnswerOption from "../utils/getDefaultAnswerOption";

const useAnswerOptions = () => {
	// #region States
	const [answerOptions, setAnswerOptions] = useState<AnswerOptionPrivate[]>([
		getDefaultAnswerOption(),
	]);
	//#endregion

	// #region Functions
	function addAnswerOption(): void {
		setAnswerOptions((options) => [...options, getDefaultAnswerOption()]);
	}

	function updateAnswerOption(
		e: ChangeEvent<HTMLInputElement>,
		id: string,
		property: AnswerOptionEditableProperty
	): void {
		const newAnswerOptions = answerOptions.map((option) => {
			// Check same option
			if (option.id === id) {
				switch (property) {
					case "text":
						option.text = e.target.value;
						break;
					case "isCorrect":
						option.isCorrect = e.target.checked;
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

	return { answerOptions, addAnswerOption, updateAnswerOption, removeAnswerOption };
};

export default useAnswerOptions;
