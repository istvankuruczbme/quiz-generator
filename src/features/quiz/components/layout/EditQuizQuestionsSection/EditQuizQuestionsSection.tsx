import { FC, HTMLAttributes, useState } from "react";
// Components
import Section from "../../../../../components/layout/Section/Section";
import NewQuestionForm from "../../../../question/components/layout/NewQuestionForm/NewQuestionForm";
import EditQuizQuestionsList from "../EditQuizQuestionsList/EditQuizQuestionsList";
import EditQuizSection from "../EditQuizSection/EditQuizSection";
import Accordion from "../../../../../components/layout/Accordion/Accordion";
// Hooks
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
// CSS
import "./EditQuizQuestionsSection.css";

type EditQuizQuestionsSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizQuestionsSection: FC<EditQuizQuestionsSectionProps> = () => {
	// #region States
	const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
	//#endregion

	// #region Hooks
	const { quiz } = useQuizPrivate();
	//#endregion

	if (quiz == null) return null;
	return (
		<EditQuizSection>
			<Accordion defaultOpen>
				<Accordion.Header>
					<Section.Title mb="0">Questions</Section.Title>
				</Accordion.Header>

				<Accordion.Body>
					<EditQuizQuestionsList questions={quiz.questions} />

					{showNewQuestionForm && (
						<NewQuestionForm hideForm={() => setShowNewQuestionForm(false)} />
					)}

					<br />
					{!showNewQuestionForm && (
						<button onClick={() => setShowNewQuestionForm(true)}>New question</button>
					)}
				</Accordion.Body>
			</Accordion>
		</EditQuizSection>
	);
};

export default EditQuizQuestionsSection;
