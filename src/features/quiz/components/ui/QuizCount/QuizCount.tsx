import { FC, HTMLAttributes } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./QuizCount.css";

type QuizCountProps = HTMLAttributes<HTMLDivElement> & {
	icon: IconDefinition;
	count: number;
	title: string;
};

const QuizCount: FC<QuizCountProps> = ({ icon, count, title, className }) => {
	return (
		<div className={`quizCount${addPropClassName(className)}`} title={title}>
			<FontAwesomeIcon icon={icon} className="quizCount__icon" />
			<span className="quizCount__value">{count}</span>
		</div>
	);
};

export default QuizCount;
