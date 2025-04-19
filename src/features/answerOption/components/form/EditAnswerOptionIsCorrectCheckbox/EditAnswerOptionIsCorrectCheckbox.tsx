import { forwardRef, InputHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./EditAnswerOptionIsCorrectCheckbox.css";

type EditAnswerOptionIsCorrectCheckboxProps = InputHTMLAttributes<HTMLInputElement>;

const EditAnswerOptionIsCorrectCheckbox = forwardRef<
	HTMLInputElement,
	EditAnswerOptionIsCorrectCheckboxProps
>(({ className, ...rest }, ref) => {
	return (
		<label
			htmlFor={rest.id}
			className={`editAnswerOptionIsCorrectCheckbox${addPropClassName(className)}`}
		>
			<input
				type="checkbox"
				className="editAnswerOptionIsCorrectCheckbox__input"
				{...rest}
				ref={ref}
			/>

			<div className="editAnswerOptionIsCorrectCheckbox__button">
				<FontAwesomeIcon
					icon={faCheck}
					className="editAnswerOptionIsCorrectCheckbox__button__icon"
				/>
			</div>
		</label>
	);
});

export default EditAnswerOptionIsCorrectCheckbox;
