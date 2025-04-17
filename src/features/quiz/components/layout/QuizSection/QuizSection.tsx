import { FC, HTMLAttributes } from "react";
// Components
import Section from "../../../../../components/layout/Section/Section";
// Functions
import addPropClassName from "../../../../../utils/addPropClassName";
// Variables
import { QUIZ_PAGE_MAX_WIDTH } from "../../../../../assets/uiConstants";
// CSS
import "./QuizSection.css";

type QuizSectionProps = HTMLAttributes<HTMLDivElement>;

const QuizSection: FC<QuizSectionProps> = ({ className, children }) => {
	return (
		<Section
			maxWidth={QUIZ_PAGE_MAX_WIDTH}
			className={`quizSection${addPropClassName(className)}`}
		>
			{children}
		</Section>
	);
};

export default QuizSection;
