import { FC, HTMLAttributes } from "react";
import { QuestionPoints } from "../../../../types/questionTypes";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./QuestionListItemPoint.css";

type QuestionListItemPointProps = HTMLAttributes<HTMLDivElement> & {
	type: keyof QuestionPoints;
	number: number;
};

const QuestionListItemPoint: FC<QuestionListItemPointProps> = ({ type, number, className }) => {
	return (
		<div
			className={`questionListItemPoint questionListItemPoint--${type}${addPropClassName(
				className
			)}`}
		>
			{number > 0 ? "+" : ""}
			{number}
		</div>
	);
};

export default QuestionListItemPoint;
