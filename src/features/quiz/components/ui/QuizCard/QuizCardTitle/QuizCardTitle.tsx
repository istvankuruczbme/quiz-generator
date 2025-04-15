import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./QuizCardTitle.css";

type QuizCardTitleProps = HTMLAttributes<HTMLHeadingElement>;

const QuizCardTitle: FC<QuizCardTitleProps> = ({ className, children }) => {
	return (
		<h3 className={`quizCardTitle${addPropClassName(className)}`} title={children?.toString()}>
			{children}
		</h3>
	);
};

export default QuizCardTitle;
