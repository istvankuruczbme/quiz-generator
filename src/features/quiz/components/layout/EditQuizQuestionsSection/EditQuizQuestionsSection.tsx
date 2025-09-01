import { FC, HTMLAttributes, useState } from "react";
// Components
import Section from "../../../../../components/layout/Section/Section";
import EditQuestion from "../../../../question/components/layout/EditQuestion/EditQuestion";
import EditQuizQuestionsList from "../EditQuizQuestionsList/EditQuizQuestionsList";
import EditQuizSection from "../EditQuizSection/EditQuizSection";
import Accordion from "../../../../../components/layout/Accordion/Accordion";
import Button from "../../../../../components/ui/Button/Button";
import EditQuestionProvider from "../../../../question/contexts/EditQuestionContext/EditQuestionProvider";
import Skeleton from "../../../../../components/ui/Skeleton/Skeleton";
import FlexContainer from "../../../../../components/layout/FlexContainer/FlexContainer";
// Hooks
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import useEditQuiz from "../../../contexts/EditQuizContext/useEditQuiz";
// CSS
import "./EditQuizQuestionsSection.css";

type EditQuizQuestionsSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizQuestionsSection: FC<EditQuizQuestionsSectionProps> = () => {
	// #region States
	const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
	//#endregion

	// #region Hooks
	const { quiz, loading: loadingQuiz } = useQuizPrivate();
	const { loadingGeneration } = useEditQuiz();
	//#endregion

	return (
		<EditQuizSection>
			<Accordion defaultOpen>
				<Accordion.Header>
					<Section.Title mb="0">Questions</Section.Title>
				</Accordion.Header>

				<Accordion.Body>
					{/* Loading questions */}
					{(loadingQuiz || loadingGeneration) && (
						<FlexContainer direction="column" gap="2rem" mb="1rem">
							<Skeleton type="rect" width="100%" height="20rem" />
							<Skeleton type="rect" width="100%" height="20rem" />
						</FlexContainer>
					)}

					{/* List of questions */}
					{quiz && <EditQuizQuestionsList questions={quiz.questions} />}

					{/* Show new question form button */}
					{!showNewQuestionForm && (
						<Button onClick={() => setShowNewQuestionForm(true)}>New question</Button>
					)}

					{/* New question form */}
					{showNewQuestionForm && (
						<EditQuestionProvider>
							<EditQuestion hideForm={() => setShowNewQuestionForm(false)} />
						</EditQuestionProvider>
					)}
				</Accordion.Body>
			</Accordion>
		</EditQuizSection>
	);
};

export default EditQuizQuestionsSection;
