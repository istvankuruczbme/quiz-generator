import { FC, HTMLAttributes } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./QuizCardCount.css";

type QuizCardCountProps = HTMLAttributes<HTMLDivElement> & {
	icon: IconDefinition;
	count: number;
	title: string;
};

const QuizCardCount: FC<QuizCardCountProps> = ({ icon, count, title, className }) => {
	return (
		<div className={`quizCardCount${addPropClassName(className)}`} title={title}>
			<FontAwesomeIcon icon={icon} className="quizCardCount__icon" />
			<span className="quizCardCount__value">{count}</span>
		</div>
	);
};

export default QuizCardCount;
