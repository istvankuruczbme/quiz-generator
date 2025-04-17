import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./QuizSummaryTitle.css";

type QuizSummaryTitleProps = HTMLAttributes<HTMLHeadingElement>;

const QuizSummaryTitle: FC<QuizSummaryTitleProps> = ({ className, children }) => {
	return <h1 className={`quizSummaryTitle${addPropClassName(className)}`}>{children}</h1>;
};

export default QuizSummaryTitle;
