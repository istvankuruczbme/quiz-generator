import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./QuestionListItemPoints.css";

type QuestionListItemPointsProps = HTMLAttributes<HTMLDivElement>;

const QuestionListItemPoints: FC<QuestionListItemPointsProps> = ({ className, children }) => {
	return <div className={`questionListItemPoints${addPropClassName(className)}`}>{children}</div>;
};

export default QuestionListItemPoints;
