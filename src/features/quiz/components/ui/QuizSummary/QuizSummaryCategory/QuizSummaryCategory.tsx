import { FC, HTMLAttributes } from "react";
import "./QuizSummaryCategory.css";
import { Category } from "../../../../../category/types/categoryTypes";
import QuizCardCategory from "../../QuizCard/QuizCardCategory/QuizCardCategory";
import addPropClassName from "../../../../../../utils/addPropClassName";

type QuizSummaryCategoryProps = HTMLAttributes<HTMLDivElement> & {
	category: Category;
};

const QuizSummaryCategory: FC<QuizSummaryCategoryProps> = ({ category, className }) => {
	return (
		<QuizCardCategory
			category={category}
			className={`quizSummaryCategory${addPropClassName(className)}`}
		/>
	);
};

export default QuizSummaryCategory;
