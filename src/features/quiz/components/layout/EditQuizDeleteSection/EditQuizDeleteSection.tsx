import { FC, HTMLAttributes, useState } from "react";
// Components
import EditQuizSection from "../EditQuizSection/EditQuizSection";
import Section from "../../../../../components/layout/Section/Section";
import Accordion from "../../../../../components/layout/Accordion/Accordion";
import Text from "../../../../../components/ui/Text/Text";
import Button from "../../../../../components/ui/Button/Button";
import DeleteQuizModal from "../DeleteQuizModal/DeleteQuizModal";
// CSS
import "./EditQuizDeleteSection.css";

type EditQuizDeleteSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizDeleteSection: FC<EditQuizDeleteSectionProps> = () => {
	// #region States
	const [showDeleteQuizModal, setShowDeleteQuizModal] = useState(false);
	//#endregion

	return (
		<EditQuizSection>
			<DeleteQuizModal show={showDeleteQuizModal} setShow={setShowDeleteQuizModal} />

			<Accordion>
				<Accordion.Header>
					<Section.Title mb="0">Delete quiz</Section.Title>
				</Accordion.Header>

				<Accordion.Body>
					<Text variant="neutral-400">
						By deleting the quiz all of its data (e.g. photos, files) will be lost.
					</Text>

					<Button variant="danger" onClick={() => setShowDeleteQuizModal(true)}>
						Delete quiz
					</Button>
				</Accordion.Body>
			</Accordion>
		</EditQuizSection>
	);
};

export default EditQuizDeleteSection;
