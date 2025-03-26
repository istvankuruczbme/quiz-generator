import { forwardRef, SelectHTMLAttributes } from "react";
import "./QuizVisibilitySelect.css";
import quizVisibilityOptions from "../../../../features/quiz/assets/quizVisibility";

type QuizVisibilitySelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const QuizVisibilitySelect = forwardRef<HTMLSelectElement, QuizVisibilitySelectProps>(
	(props, ref) => {
		return (
			<div>
				<label htmlFor={props.id}>Visibility</label>
				<select {...props} ref={ref}>
					{quizVisibilityOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.text}
						</option>
					))}
				</select>
			</div>
		);
	}
);

export default QuizVisibilitySelect;
