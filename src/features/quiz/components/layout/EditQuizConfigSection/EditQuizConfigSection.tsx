import { FC, HTMLAttributes } from "react";
// Components
import Section from "../../../../../components/layout/Section/Section";
import EditQuizSection from "../EditQuizSection/EditQuizSection";
import Accordion from "../../../../../components/layout/Accordion/Accordion";
import EditQuizConfigForm from "../../form/EditQuizConfigForm/EditQuizConfigForm";
// CSS
import "./EditQuizConfigSection.css";

type EditQuizConfigSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizConfigSection: FC<EditQuizConfigSectionProps> = () => {
	return (
		<EditQuizSection>
			<Accordion defaultOpen>
				<Accordion.Header>
					<Section.Title mb="0">Quiz config</Section.Title>
				</Accordion.Header>

				<Accordion.Body>
					<EditQuizConfigForm />
				</Accordion.Body>
			</Accordion>
		</EditQuizSection>
	);
};

export default EditQuizConfigSection;
