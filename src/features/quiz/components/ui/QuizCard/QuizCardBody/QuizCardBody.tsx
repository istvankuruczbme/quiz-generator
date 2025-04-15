import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./QuizCardBody.css";

type QuizCardBodyProps = HTMLAttributes<HTMLDivElement>;

const QuizCardBody: FC<QuizCardBodyProps> = ({ className, children }) => {
	return <div className={`quizCardBody${addPropClassName(className)}`}>{children}</div>;
};

export default QuizCardBody;
