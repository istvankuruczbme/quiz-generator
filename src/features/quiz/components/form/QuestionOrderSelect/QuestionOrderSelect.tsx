import { forwardRef } from "react";
import Select, { SelectProps } from "../../../../../components/form/Select/Select";
import addPropClassName from "../../../../../utils/addPropClassName";
import questionOrderOptions from "../../../assets/questionOrder";
import "./QuestionOrderSelect.css";

type QuestionOrderSelectProps = Omit<SelectProps, "options">;

const QuestionOrderSelect = forwardRef<HTMLSelectElement, QuestionOrderSelectProps>(
	({ className, ...rest }, ref) => {
		// #region Variables
		const orderOptions = questionOrderOptions.map((option) => ({
			id: option.value,
			text: option.text,
		}));
		//#endregion

		return (
			<Select
				label="Question order"
				options={orderOptions}
				className={`questionOrderSelect${addPropClassName(className)}`}
				{...rest}
				ref={ref}
			/>
		);
	}
);

export default QuestionOrderSelect;
