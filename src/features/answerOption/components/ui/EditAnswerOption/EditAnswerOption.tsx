import { FC, HTMLAttributes } from "react";
import { AnswerOptionPrivate } from "../../../types/answerOptionTypes";
// Components
import EditAnswerOptionIsCorrectCheckbox from "../../form/EditAnswerOptionIsCorrectCheckbox/EditAnswerOptionIsCorrectCheckbox";
import Button from "../../../../../components/ui/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Textarea from "../../../../../components/form/Textarea/Textarea";
// Hooks
import useEditQuestion from "../../../../question/contexts/EditQuestionContext/useEditQuestion";
// Functions
import addPropClassName from "../../../../../utils/addPropClassName";
// CSS
import "./EditAnswerOption.css";

type EditAnswerOptionProps = HTMLAttributes<HTMLDivElement> & {
	option: AnswerOptionPrivate;
};

const EditAnswerOption: FC<EditAnswerOptionProps> = ({ option, className }) => {
	// #region Hooks
	const { updateAnswerOption, removeAnswerOption } = useEditQuestion();
	// #endregion

	return (
		<div className={`editAnswerOption${addPropClassName(className)}`}>
			<Textarea
				label="Text"
				id={`${option.id}-text`}
				placeholder="Text"
				minHeight="1rem"
				className="editAnswerOption__textarea"
				required
				value={option.text}
				onChange={(e) => updateAnswerOption(e, option.id, "text")}
			/>

			<div className="editAnswerOption__buttons">
				<EditAnswerOptionIsCorrectCheckbox
					id={`${option.id}-isCorrect`}
					checked={option.isCorrect}
					onChange={(e) => updateAnswerOption(e, option.id, "isCorrect")}
				/>

				<Button
					variant="danger"
					outlined
					title="Remove"
					className="editAnswerOption__remove"
					onClick={() => removeAnswerOption(option.id)}
				>
					<FontAwesomeIcon icon={faTrashAlt} />
				</Button>
			</div>
		</div>
	);
};

export default EditAnswerOption;
