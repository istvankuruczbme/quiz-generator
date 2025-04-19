import { FC, HTMLAttributes, useState } from "react";
// Components
import EditQuizSection from "../EditQuizSection/EditQuizSection";
import Section from "../../../../../components/layout/Section/Section";
import Button from "../../../../../components/ui/Button/Button";
import Text from "../../../../../components/ui/Text/Text";
import Accordion from "../../../../../components/layout/Accordion/Accordion";
import FinishQuizModal from "../FinishQuizModal/FinishQuizModal";
// CSS
import "./EditQuizFinishSection.css";

type EditQuizFinishSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizFinishSection: FC<EditQuizFinishSectionProps> = () => {
	//#region States
	const [showFinishQuizModal, setShowFinishQuizModal] = useState(false);
	// #endregion

	return (
		<EditQuizSection>
			<FinishQuizModal show={showFinishQuizModal} setShow={setShowFinishQuizModal} />

			<Accordion defaultOpen>
				<Accordion.Header>
					<Section.Title mb="0">Finish quiz</Section.Title>
				</Accordion.Header>

				<Accordion.Body>
					<Text variant="neutral-400">
						By clicking on Finish quiz button you won't be able to edit the quiz in the
						future.
					</Text>

					<Button variant="accent" full onClick={() => setShowFinishQuizModal(true)}>
						Finish quiz
					</Button>
				</Accordion.Body>
			</Accordion>
		</EditQuizSection>
	);
};

export default EditQuizFinishSection;
