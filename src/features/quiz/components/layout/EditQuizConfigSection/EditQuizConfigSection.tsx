import { FC, FormEvent, HTMLAttributes, useState } from "react";
// Components
import QuizVisibilitySelect from "../../form/QuizVisibilitySelect/QuizVisibilitySelect";
import Section from "../../../../../components/layout/Section/Section";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import FormButtonsContainer from "../../../../../components/form/FormButtonsContainer/FormButtonsContainer";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import QuestionOrderSelect from "../../form/QuestionOrderSelect/QuestionOrderSelect";
import EditQuizSection from "../EditQuizSection/EditQuizSection";
import Accordion from "../../../../../components/layout/Accordion/Accordion";
import Skeleton from "../../../../../components/ui/Skeleton/Skeleton";
// Hooks
import useQuizData from "../../../hooks/useQuizData";
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// Functions
import updateQuizConfig from "../../../sevices/updateQuizConfig";
// Variables
import { QuizVisibility } from "../../../assets/quizVisibility";
import { QuestionOrder } from "../../../assets/questionOrder";
// CSS
import "./EditQuizConfigSection.css";
import FlexContainer from "../../../../../components/layout/FlexContainer/FlexContainer";

type EditQuizConfigSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizConfigSection: FC<EditQuizConfigSectionProps> = () => {
	// #region States
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Hooks
	const { quiz, loading: loadingQuiz, updateQuizState } = useQuizPrivate();
	const { visibility, setVisibility, questionOrder, setQuestionOrder } = useQuizData(quiz);
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	//#endregion

	// #region Functions
	async function handleUpdateQuizConfig(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Check quiz
		if (quiz == null) return;

		setLoading(true);

		try {
			// Update quiz config
			await updateQuizConfig(quiz.id, visibility, questionOrder);

			// Update quiz state
			await updateQuizState();

			// Show feedback
			setFeedback({
				type: "success",
				message: "Quiz config updated.",
			});
		} catch (err) {
			// console.log("Error updating quiz config.", err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	//#endregion

	return (
		<EditQuizSection>
			<Accordion defaultOpen>
				<Accordion.Header>
					<Section.Title mb="0">Quiz config</Section.Title>
				</Accordion.Header>

				<Accordion.Body>
					<form onSubmit={handleUpdateQuizConfig}>
						<FormInputsContainer>
							{loadingQuiz && (
								<FlexContainer gap="2rem">
									<Skeleton type="rect" width="100%" height="3rem" />
									<Skeleton type="rect" width="100%" height="3rem" />
								</FlexContainer>
							)}

							{!loadingQuiz && (
								<FlexContainer gap="2rem">
									<QuizVisibilitySelect
										full
										value={visibility}
										onChange={(e) => setVisibility(e.target.value as QuizVisibility)}
									/>
									<QuestionOrderSelect
										full
										value={questionOrder}
										onChange={(e) => setQuestionOrder(e.target.value as QuestionOrder)}
									/>
								</FlexContainer>
							)}
						</FormInputsContainer>

						<FormButtonsContainer>
							<LoadingButton type="submit" full loading={loading}>
								Save
							</LoadingButton>
						</FormButtonsContainer>
					</form>
				</Accordion.Body>
			</Accordion>
		</EditQuizSection>
	);
};

export default EditQuizConfigSection;
