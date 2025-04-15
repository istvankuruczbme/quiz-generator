import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./QuizContainer.css";

type QuizContainerProps = HTMLAttributes<HTMLDivElement>;

const QuizContainer: FC<QuizContainerProps> = ({ className, children }) => {
	return <div className={`quizContainer${addPropClassName(className)}`}>{children}</div>;
};

export default QuizContainer;
