import { FC, FormEvent, HTMLAttributes } from "react";
// Components
import QuestionPoints from "../QuestionPoints/QuestionPoints";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import Textarea from "../../../../../components/form/Textarea/Textarea";
import Text from "../../../../../components/ui/Text/Text";
import FileUpload from "../../../../../components/layout/FileUpload/FileUpload";
import FormButtonsContainer from "../../../../../components/form/FormButtonsContainer/FormButtonsContainer";
import Button from "../../../../../components/ui/Button/Button";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import EditAnswerOptions from "../../../../answerOption/components/layout/EditAnswerOptions/EditAnswerOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Divider from "../../../../../components/ui/Divider/Divider";
// Hooks
import useQuizPrivate from "../../../../quiz/contexts/QuizPrivateContext/useQuizPrivate";
import useEditQuestion from "../../../contexts/EditQuestionContext/useEditQuestion";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// Functions
import transformQuestionData from "../../../utils/transformQuestionData";
import validateQuestionData from "../../../utils/validation/validateQuestionData";
// CSS
import "./EditQuestion.css";
import useCreateQuestion from "../../../hooks/useCreateQuestion";
import useUpdateQuestion from "../../../hooks/useUpdateQuestion";

type EditQuestionProps = HTMLAttributes<HTMLDivElement> & {
	hideForm: () => void;
};

const EditQuestion: FC<EditQuestionProps> = ({ hideForm }) => {
	//#region Hooks
	const { quiz } = useQuizPrivate();
	const { question, data, updateData } = useEditQuestion();
	const { mutateAsync: createQuestion, loading: loadingCreateQuestion } = useCreateQuestion();
	const { mutateAsync: updateQuestion, loading: loadingUpdateQuestion } = useUpdateQuestion();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	//#endregion

	// #region Constants
	const loading = loadingCreateQuestion || loadingUpdateQuestion;
	//#endregion

	//#region Functions
	async function handleEditQuestionSubmit(e: FormEvent) {
		e.preventDefault();

		// Check quiz
		if (!quiz) return;

		// Transform data
		const transformedData = transformQuestionData(data);

		try {
			// Validation
			const questionData = validateQuestionData(transformedData);

			// No question
			if (!question) {
				// Create question
				await createQuestion({
					quizId: quiz.id,
					data: { ...questionData, order: quiz.questions.length + 1 },
				});
			} else {
				// Update question
				await updateQuestion({
					ids: { quizId: quiz.id, questionId: question.id },
					data: questionData,
				});
			}

			// Show feedback
			setFeedback({
				type: "success",
				message: `Question ${question ? "updated" : "added"}.`,
			});

			// Hide form
			hideForm();
		} catch (err) {
			setError(err);
		}
	}

	function handleClose() {
		// Check if there is an edited question
		if (question) {
			// Reset inputs
			updateData({
				text: question.text,
				photoUrl: question.photoUrl,
				correct: question.points.correct.toString(),
				wrong: question.points.wrong.toString(),
				empty: question.points.empty.toString(),
				answerOptions: question.answerOptions,
			});
		}

		// Hide form
		hideForm();
	}
	//#endregion

	return (
		<div className="editQuestion">
			<header className="editQuestion__header">
				<h3 className="editQuestion__title">
					{question == undefined ? "New" : "Edit"} question
				</h3>

				<Button variant="primary" className="editQuestion__header__close" onClick={handleClose}>
					<FontAwesomeIcon icon={faXmark} />
				</Button>
			</header>

			<form onSubmit={handleEditQuestionSubmit}>
				<FormInputsContainer>
					<Textarea
						label="Question"
						id="editQuestionText"
						placeholder="Question"
						required
						value={data.text}
						onChange={(e) => updateData({ text: e.target.value })}
					/>

					<Text mb="-1rem">Photo</Text>
					<FileUpload
						uploadType="photo"
						defaultPhotoUrl={data.photoUrl ?? undefined}
						onFileChange={(photo, photoUrl) =>
							updateData({ photo, photoUrl: photoUrl ?? null })
						}
					/>

					<QuestionPoints />

					<EditAnswerOptions />
				</FormInputsContainer>

				<Divider />

				<FormButtonsContainer className="editQuestion__buttons--full">
					<Button variant="neutral" onClick={handleClose}>
						Cancel
					</Button>

					{/* <Button variant="neutral">Preview</Button> */}
					<LoadingButton type="submit" variant="accent" full loading={loading}>
						{question == undefined ? "Create" : "Update"} question
					</LoadingButton>
				</FormButtonsContainer>

				<div className="editQuestion__buttons--small">
					{/* <Button variant="neutral" className="editQuestion__preview">
						Preview
					</Button> */}
					<FormButtonsContainer>
						<Button variant="neutral" onClick={handleClose}>
							Cancel
						</Button>
						<LoadingButton type="submit" variant="accent" full loading={loading}>
							{question == undefined ? "Create" : "Update"} question
						</LoadingButton>
					</FormButtonsContainer>
				</div>
			</form>
		</div>
	);
};

export default EditQuestion;
