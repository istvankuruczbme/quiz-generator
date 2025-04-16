import { FC, HTMLAttributes } from "react";
import Section from "../../../../../components/layout/Section/Section";
import addPropClassName from "../../../../../utils/addPropClassName";
import { NEW_QUIZ_PAGE_MAX_WIDTH } from "../../../../../assets/uiConstants";
import "./NewQuizSection.css";

type NewQuizSectionProps = HTMLAttributes<HTMLDivElement>;

const NewQuizSection: FC<NewQuizSectionProps> = ({ className, children }) => {
	return (
		<Section
			maxWidth={NEW_QUIZ_PAGE_MAX_WIDTH}
			className={`newQuizSection${addPropClassName(className)}`}
		>
			{children}
		</Section>
	);
};

export default NewQuizSection;
