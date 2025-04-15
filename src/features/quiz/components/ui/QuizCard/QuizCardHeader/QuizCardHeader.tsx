import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./QuizCardHeader.css";

type QuizCardHeaderProps = HTMLAttributes<HTMLDivElement>;

const QuizCardHeader: FC<QuizCardHeaderProps> = ({ className, children }) => {
	return <header className={`quizCardHeader${addPropClassName(className)}`}>{children}</header>;
};

export default QuizCardHeader;
