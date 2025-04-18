import { FC, FormEvent, HTMLAttributes, useState } from "react";
// Components
import QuizVisibilitySelect from "../../form/QuizVisibilitySelect/QuizVisibilitySelect";
import Section from "../../../../../components/layout/Section/Section";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import FormButtonsContainer from "../../../../../components/form/FormButtonsContainer/FormButtonsContainer";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import QuestionOrderSelect from "../../form/QuestionOrderSelect/QuestionOrderSelect";
import EditQuizSection from "../EditQuizSection/EditQuizSection";
// Hooks
import useQuizData from "../../../hooks/useQuizData";
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import useError from "../../../../ui/error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// Functions
import updateQuizConfig from "../../../sevices/updateQuizConfig";
// Variables
import { QuizVisibility } from "../../../assets/quizVisibility";
import { QuestionOrder } from "../../../assets/questionOrder";
// CSS
import "./EditQuizConfigSection.css";
import Accordion from "../../../../../components/layout/Accordion/Accordion";

type EditQuizConfigSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizConfigSection: FC<EditQuizConfigSectionProps> = () => {
	// #region States
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Hooks
	const { quiz, updateQuizState } = useQuizPrivate();
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
			<Accordion>
				<Accordion.Header>
					<Section.Title mb="0">Quiz config</Section.Title>
				</Accordion.Header>

				<Accordion.Body>
					<form onSubmit={handleUpdateQuizConfig}>
						<FormInputsContainer>
							<QuizVisibilitySelect
								value={visibility}
								onChange={(e) => setVisibility(e.target.value as QuizVisibility)}
							/>
							<QuestionOrderSelect
								value={questionOrder}
								onChange={(e) => setQuestionOrder(e.target.value as QuestionOrder)}
							/>
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
