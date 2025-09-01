import { FC, HTMLAttributes } from "react";
// Components
import EditQuizSection from "../EditQuizSection/EditQuizSection";
import Section from "../../../../../components/layout/Section/Section";
import Accordion from "../../../../../components/layout/Accordion/Accordion";
import EditQuizDataForm from "../../form/EditQuizDataForm/EditQuizDataForm";
// CSS
import "./EditQuizDataSection.css";

type EditQuizDataSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizDataSection: FC<EditQuizDataSectionProps> = () => {
	return (
		<EditQuizSection>
			<Accordion defaultOpen>
				<Accordion.Header>
					<Section.Title mb="0">Quiz data</Section.Title>
				</Accordion.Header>

				<Accordion.Body>
					<EditQuizDataForm />
				</Accordion.Body>
			</Accordion>
		</EditQuizSection>
	);
};

export default EditQuizDataSection;
