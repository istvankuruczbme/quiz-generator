import { forwardRef, InputHTMLAttributes } from "react";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./QuizCreativityRange.css";

type QuizCreativityRangeProps = InputHTMLAttributes<HTMLInputElement>;

const QuizCreativityRange = forwardRef<HTMLInputElement, QuizCreativityRangeProps>(
	({ className, ...rest }, ref) => {
		return (
			<div className={`quizCreativityRange${addPropClassName(className)}`}>
				<label htmlFor={rest.id} className="quizCreativityRange__label">
					Creativity
				</label>

				<div className="quizCreativityRange__input__container">
					<input
						type="range"
						id="editQuizQuestionsCreativity"
						min={0}
						max={100}
						required
						className="quizCreativityRange__input"
						{...rest}
						ref={ref}
					/>

					<span className="quizCreativityRange__limit quizCreativityRange__limit--min">
						0%
					</span>
					<span className="quizCreativityRange__limit quizCreativityRange__limit--max">
						100%
					</span>
				</div>
			</div>
		);
	}
);

export default QuizCreativityRange;
