import { FC, HTMLAttributes } from "react";
// Components
import EditQuizSection from "../EditQuizSection/EditQuizSection";
import Text from "../../../../../components/ui/Text/Text";
import Section from "../../../../../components/layout/Section/Section";
import Accordion from "../../../../../components/layout/Accordion/Accordion";
// CSS
import "./EditQuizGenerateQuestionsSection.css";
import EditQuizGenerateQuestionsForm from "../../form/EditQuizGenerateQuestionsForm/EditQuizGenerateQuestionsForm";

type EditQuizGenerateQuestionsSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizGenerateQuestionsSection: FC<EditQuizGenerateQuestionsSectionProps> = () => {
	return (
		<EditQuizSection>
			<Accordion defaultOpen>
				<Accordion.Header>
					<Section.Title mb="0">Generate questions</Section.Title>
				</Accordion.Header>

				<Accordion.Body>
					<Text variant="neutral-400">
						Generate questions from file. You only have to select a text document (.txt / .md
						/ .pdf / .docx) and click on Generate.
					</Text>
					<Text variant="neutral-400">
						Make sure that the document contains only the relevant part you want to generate
						the questions from. For example make sure to exclude parts like table of content
						etc.
					</Text>
					<Text variant="neutral-400">
						Currently only hungarian and english languages are supported.
					</Text>

					<EditQuizGenerateQuestionsForm />
				</Accordion.Body>
			</Accordion>
		</EditQuizSection>
	);
};

export default EditQuizGenerateQuestionsSection;
