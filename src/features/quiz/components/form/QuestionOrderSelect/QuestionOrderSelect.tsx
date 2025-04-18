import { forwardRef, SelectHTMLAttributes } from "react";
import Select from "../../../../../components/form/Select/Select";
import addPropClassName from "../../../../../utils/addPropClassName";
import questionOrderOptions from "../../../assets/questionOrder";
import "./QuestionOrderSelect.css";

type QuestionOrderSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

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
				label="Questio order"
				options={orderOptions}
				className={`questionOrderSelect${addPropClassName(className)}`}
				{...rest}
				ref={ref}
			/>
		);
	}
);

export default QuestionOrderSelect;
