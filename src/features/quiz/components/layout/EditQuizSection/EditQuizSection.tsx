import { FC, HTMLAttributes } from "react";
import Section from "../../../../../components/layout/Section/Section";
import addPropClassName from "../../../../../utils/addPropClassName";
import { EDIT_QUIZ_PAGE_MAX_WIDTH } from "../../../../../assets/uiConstants";
import "./EditQuizSection.css";

type EditQuizSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizSection: FC<EditQuizSectionProps> = ({ className, children }) => {
	return (
		<Section
			maxWidth={EDIT_QUIZ_PAGE_MAX_WIDTH}
			className={`editQuizSection${addPropClassName(className)}`}
		>
			{children}
		</Section>
	);
};

export default EditQuizSection;
