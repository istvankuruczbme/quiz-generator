import { ChangeEvent, FC, HTMLAttributes } from "react";
import {
	AnswerOptionEditableProperty,
	AnswerOptionPrivate,
} from "../../../types/answerOptionTypes";
import "./NewAnswerOption.css";

type AnswerOptionProps = HTMLAttributes<HTMLDivElement> & {
	option: AnswerOptionPrivate;
	updateAnswerOption: (
		e: ChangeEvent<HTMLInputElement>,
		id: string,
		property: AnswerOptionEditableProperty
	) => void;
	removeAnswerOption: (id: string) => void;
};

const NewAnswerOption: FC<AnswerOptionProps> = ({
	option,
	updateAnswerOption,
	removeAnswerOption,
}) => {
	return (
		<div key={option.id}>
			<label htmlFor={`${option.id}-text`}>Text</label>
			<input
				type="text"
				id={`${option.id}-text`}
				placeholder="Text"
				value={option.text}
				onChange={(e) => updateAnswerOption(e, option.id, "text")}
				required
			/>

			<input
				type="checkbox"
				id={`${option.id}-isCorrect`}
				checked={option.isCorrect}
				onChange={(e) => updateAnswerOption(e, option.id, "isCorrect")}
			/>
			<label htmlFor={`${option.id}-isCorrect`}>Correct</label>

			<button type="button" onClick={() => removeAnswerOption(option.id)}>
				Remove
			</button>
		</div>
	);
};

export default NewAnswerOption;
