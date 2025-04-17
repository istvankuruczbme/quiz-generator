import { FC, HTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Category } from "../../../../../category/types/categoryTypes";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./QuizCategory.css";

type QuizCategoryProps = HTMLAttributes<HTMLDivElement> & {
	category: Category;
};

const QuizCategory: FC<QuizCategoryProps> = ({ category, className }) => {
	return (
		<div className={`quizCategory${addPropClassName(className)}`}>
			<FontAwesomeIcon icon={category.icon} className="quizCategory__icon" />
			<span className="quizCategory__name">{category.name}</span>
		</div>
	);
};

export default QuizCategory;
