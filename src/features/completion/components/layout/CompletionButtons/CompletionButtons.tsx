import { useNavigate } from "react-router-dom";
import Section from "../../../../../components/layout/Section/Section";
import Button from "../../../../../components/ui/Button/Button";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import useCompletionQuestionPrivate from "../../../../completionQuestion/hooks/useCompletionQuestionPrivate";
import useCreateCompletionQuestion from "../../../../completionQuestion/hooks/useCreateCompletionQuestion";
import validateNewCompletionQuestionData from "../../../../completionQuestion/utils/validation/validateNewCompletionQuestionData";
import useError from "../../../../error/hooks/useError";
import useCompletionPublic from "../../../contexts/CompletionPublicContext/useCompletionPublic";
import useFinishCompletion from "../../../hooks/useFinishCompletion";
import "./CompletionButtons.css";

const CompletionButtons = () => {
	// #region Hooks
	const {
		completion,
		question,
		questionNumber,
		completionQuestion,
		setCompletionQuestion,
		selectedAnswerOptions,
		removeAnswerOptions,
		resetAnswerOptions,
		goToNextQuestion,
	} = useCompletionPublic();
	const { mutateAsync: createCompletionQuestion, loading: loadingCreateCompletionQuestion } =
		useCreateCompletionQuestion();
	const {
		mutateAsync: getCompletionQuestionPrivate,
		loading: loadingGetCompletionQuestionPrivate,
	} = useCompletionQuestionPrivate();
	const { mutateAsync: finishCompletion, loading: loadingFinishCompletion } =
		useFinishCompletion();
	const { setError } = useError();
	const navigate = useNavigate();
	// #endregion

	// #region Contants
	const lastQuestion = questionNumber === completion?.quiz.questions.length;
	// #endregion

	// #region Functions
	async function handleCheckClick() {
		// Check completion and question
		if (!completion || !question) return;

		try {
			// Validation
			const completionQuestionData = validateNewCompletionQuestionData({
				selectedAnswerOptions,
			});

			// Create completion question
			await createCompletionQuestion({
				ids: { quizId: completion.quiz.id, completionId: completion.id },
				data: {
					selectedAnswerOptions: completionQuestionData.selectedAnswerOptions,
					questionId: question.id,
				},
			});

			// Get completion question
			const completionQuestion = await getCompletionQuestionPrivate({
				quizId: completion.quiz.id,
				completionId: completion.id,
				questionId: question.id,
			});
			setCompletionQuestion(completionQuestion);
		} catch (err) {
			setError(err);
		}
	}

	async function handleNextClick() {
		// Check completion and question
		if (!completion || !question) return;

		// Question is already checked
		if (completionQuestion) {
			// Remove completion question
			setCompletionQuestion(null);

			// Reset selected answer options
			resetAnswerOptions();

			// Next question
			goToNextQuestion();

			return;
		}

		try {
			// Validation
			const completionQuestionData = validateNewCompletionQuestionData({
				selectedAnswerOptions,
			});

			// Next question
			goToNextQuestion();

			// Create completion question
			await createCompletionQuestion({
				ids: { quizId: completion.quiz.id, completionId: completion.id },
				data: {
					selectedAnswerOptions: completionQuestionData.selectedAnswerOptions,
					questionId: question.id,
				},
			});

			// Reset selected answer options
			removeAnswerOptions(completionQuestionData.selectedAnswerOptions);
		} catch (err) {
			setError(err);
		}
	}

	async function handleFinishClick() {
		// Check completion and question
		if (!completion || !question) return;

		// Question is already checked
		if (completionQuestion) {
			// Remove completion question
			setCompletionQuestion(null);

			// Reset selected answer options
			resetAnswerOptions();

			// Finish completion
			await finishCompletion({ quizId: completion.quiz.id, completionId: completion.id });

			// Navigate
			navigate(`/quizzes/${completion.quiz.id}/completions/${completion.id}/overview`);

			return;
		}

		try {
			// Validation
			const completionQuestionData = validateNewCompletionQuestionData({
				selectedAnswerOptions,
			});

			// Create completion question
			await createCompletionQuestion({
				ids: { quizId: completion.quiz.id, completionId: completion.id },
				data: {
					selectedAnswerOptions: completionQuestionData.selectedAnswerOptions,
					questionId: question.id,
				},
			});

			// Finish completion
			await finishCompletion({ quizId: completion.quiz.id, completionId: completion.id });

			// Navigate
			navigate(`/quizzes/${completion.quiz.id}/completions/${completion.id}/overview`);
		} catch (err) {
			setError(err);
		}
	}
	// #endregion

	return (
		<Section>
			<div className="completionButtons">
				<LoadingButton
					loading={loadingCreateCompletionQuestion || loadingGetCompletionQuestionPrivate}
					disabled={completionQuestion != null}
					full
					onClick={handleCheckClick}
				>
					Check
				</LoadingButton>
				{!lastQuestion && (
					<Button full onClick={handleNextClick}>
						Next
					</Button>
				)}
				{lastQuestion && (
					<LoadingButton
						loading={
							(!completionQuestion && loadingCreateCompletionQuestion) ||
							loadingFinishCompletion
						}
						full
						onClick={handleFinishClick}
					>
						Finish
					</LoadingButton>
				)}
			</div>
		</Section>
	);
};

export default CompletionButtons;
