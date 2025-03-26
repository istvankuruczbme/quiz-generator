import { forwardRef, SelectHTMLAttributes } from "react";
import questionOrderOptions from "../../../../features/quiz/assets/questionOrder";
import "./QuestionOrderSelect.css";

type QuestionOrderSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const QuestionOrderSelect = forwardRef<HTMLSelectElement, QuestionOrderSelectProps>(
	(props, ref) => {
		return (
			<div>
				<label htmlFor={props.id}>Question order</label>
				<select {...props} ref={ref}>
					{questionOrderOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.text}
						</option>
					))}
				</select>
			</div>
		);
	}
);

export default QuestionOrderSelect;
