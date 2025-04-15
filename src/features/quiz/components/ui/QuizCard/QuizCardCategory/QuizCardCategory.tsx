import { FC, HTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Category } from "../../../../../category/types/categoryTypes";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./QuizCardCategory.css";

type QuizCardCategoryProps = HTMLAttributes<HTMLDivElement> & {
	category: Category;
};

const QuizCardCategory: FC<QuizCardCategoryProps> = ({ category, className }) => {
	return (
		<div className={`quizCardCategory${addPropClassName(className)}`}>
			<FontAwesomeIcon icon={category.icon} className="quizCardCategory__icon" />
			<span className="quizCardCategory__name">{category.name}</span>
		</div>
	);
};

export default QuizCardCategory;
