import { forwardRef, InputHTMLAttributes } from "react";
import addPropClassName from "../../../../../utils/addPropClassName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./AnswerOptionCheckbox.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	correct?: boolean;
	wrong?: boolean;
	empty?: boolean;
};

const AnswerOptionCheckbox = forwardRef<HTMLInputElement, Props>(
	({ label, correct, wrong, empty, disabled, className, ...rest }, ref) => {
		// #region Constants
		const variant = correct
			? "correct"
			: wrong
			? "wrong"
			: empty
			? "empty"
			: rest.checked
			? "selected"
			: "default";
		// #endregion

		return (
			<label
				htmlFor={rest.id}
				className={`answerOptionCheckbox answerOptionCheckbox--${variant}${addPropClassName(
					className
				)}`}
			>
				<input
					type="checkbox"
					className="answerOptionCheckbox__input"
					disabled={correct || wrong || disabled}
					{...rest}
					ref={ref}
				/>
				<span className="answerOptionCheckbox__marker">
					{(correct || empty || (rest.checked && !wrong)) && (
						<FontAwesomeIcon icon={faCheck} className="answerOptionCheckbox__marker__icon" />
					)}
					{wrong && (
						<FontAwesomeIcon icon={faXmark} className="answerOptionCheckbox__marker__icon" />
					)}
				</span>
				<span className="answerOptionCheckbox__label">
					{label}
					{variant}
				</span>
			</label>
		);
	}
);

export default AnswerOptionCheckbox;
