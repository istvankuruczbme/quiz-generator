import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./QuizSummarySubtitle.css";

type QuizSummarySubtitleProps = HTMLAttributes<HTMLHeadingElement>;

const QuizSummarySubtitle: FC<QuizSummarySubtitleProps> = ({ className, children }) => {
	return <h2 className={`quizSummarySubtitle${addPropClassName(className)}`}>{children}</h2>;
};

export default QuizSummarySubtitle;
