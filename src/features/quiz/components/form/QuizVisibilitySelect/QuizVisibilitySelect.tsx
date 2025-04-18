import { forwardRef, SelectHTMLAttributes } from "react";
// Components
import Select from "../../../../../components/form/Select/Select";
// Functions
import addPropClassName from "../../../../../utils/addPropClassName";
// Variables
import quizVisibilityOptions from "../../../assets/quizVisibility";
// CSS
import "./QuizVisibilitySelect.css";

type QuizVisibilitySelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const QuizVisibilitySelect = forwardRef<HTMLSelectElement, QuizVisibilitySelectProps>(
	({ className, ...rest }, ref) => {
		// #region Variables
		const visibilityOptions = quizVisibilityOptions.map((option) => ({
			id: option.value,
			text: option.text,
		}));
		// #endregion

		return (
			<Select
				label="Visibility"
				options={visibilityOptions}
				className={`quizVisibilitySelect${addPropClassName(className)}`}
				{...rest}
				ref={ref}
			/>
		);
	}
);

export default QuizVisibilitySelect;
