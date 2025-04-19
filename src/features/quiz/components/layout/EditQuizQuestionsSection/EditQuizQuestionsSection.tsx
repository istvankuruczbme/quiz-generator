import { FC, HTMLAttributes, useState } from "react";
// Components
import Section from "../../../../../components/layout/Section/Section";
import EditQuestion from "../../../../question/components/layout/EditQuestion/EditQuestion";
import EditQuizQuestionsList from "../EditQuizQuestionsList/EditQuizQuestionsList";
import EditQuizSection from "../EditQuizSection/EditQuizSection";
import Accordion from "../../../../../components/layout/Accordion/Accordion";
import Button from "../../../../../components/ui/Button/Button";
import EditQuestionProvider from "../../../../question/contexts/EditQuestionContext/EditQuestionProvider";
// Hooks
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
// CSS
import "./EditQuizQuestionsSection.css";
import Skeleton from "../../../../../components/ui/Skeleton/Skeleton";
import FlexContainer from "../../../../../components/layout/FlexContainer/FlexContainer";

type EditQuizQuestionsSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizQuestionsSection: FC<EditQuizQuestionsSectionProps> = () => {
	// #region States
	const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
	//#endregion

	// #region Hooks
	const { quiz, loading: loadingQuiz } = useQuizPrivate();
	//#endregion

	return (
		<EditQuizSection>
			<Accordion defaultOpen>
				<Accordion.Header>
					<Section.Title mb="0">Questions</Section.Title>
				</Accordion.Header>

				<Accordion.Body>
					{/* List of questions */}
					{loadingQuiz && (
						<FlexContainer direction="column" gap="2rem">
							<Skeleton type="rect" width="100%" height="20rem" />
							<Skeleton type="rect" width="100%" height="20rem" />
						</FlexContainer>
					)}
					{quiz != null && <EditQuizQuestionsList questions={quiz.questions} />}

					{/* New question form */}
					{showNewQuestionForm && (
						<EditQuestionProvider>
							<EditQuestion hideForm={() => setShowNewQuestionForm(false)} />
						</EditQuestionProvider>
					)}

					{/* Show new question form buttons */}
					{!showNewQuestionForm && (
						<Button onClick={() => setShowNewQuestionForm(true)}>New question</Button>
					)}
				</Accordion.Body>
			</Accordion>
		</EditQuizSection>
	);
};

export default EditQuizQuestionsSection;
