import { FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
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
import validateQuestionPointsData from "../../../utils/validation/validateQuestionPointsData";
import validateQuestionData from "../../../utils/validation/validateQuestionData";
import createQuestion from "../../../services/createQuestion";
import updateQuestion from "../../../services/updateQuestion";
// CSS
import "./EditQuestion.css";

type EditQuestionProps = HTMLAttributes<HTMLDivElement> & {
	hideForm: () => void;
};

const EditQuestion: FC<EditQuestionProps> = ({ hideForm }) => {
	// #region States
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Refs
	const photoRef = useRef<HTMLInputElement>(null);
	//#endregion

	//#region Hooks
	const { quiz, updateQuizState } = useQuizPrivate();
	const {
		question,
		text,
		setText,
		photoUrl,
		setPhotoUrl,
		correct,
		setCorrect,
		wrong,
		setWrong,
		empty,
		setEmpty,
		answerOptions,
		setAnswerOptions,
	} = useEditQuestion();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	//#endregion

	//#region Functions
	async function handleEditQuestionSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Check quiz
		if (quiz == null) return;

		setLoading(true);

		// Input values
		const photo = photoRef.current?.files?.[0];

		try {
			// Validation
			validateQuestionData(text, answerOptions);
			validateQuestionPointsData(correct, wrong, empty);
		} catch (err) {
			setError(err);
			setLoading(false);
			return;
		}

		try {
			if (question == undefined) {
				// Create question
				await createQuestion(
					text as string,
					photo,
					quiz.questions.length + 1,
					{ correct, wrong, empty },
					answerOptions,
					quiz.id
				);
			} else {
				// Update question
				await updateQuestion(
					question.id,
					text as string,
					photo,
					question.order,
					{ correct, wrong, empty },
					answerOptions,
					quiz.id
				);
			}

			// Update quiz questions
			await updateQuizState();

			// Show feedback
			setFeedback({
				type: "success",
				message: `Question ${question == undefined ? "added" : "updated"}.`,
			});

			// Hide form
			hideForm();
		} catch (err) {
			// console.log("Error adding the question to DB.", err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}

	function handleClose() {
		// Check if there is an edited question
		if (question != undefined) {
			// Reset inputs
			setText(question.text);
			setPhotoUrl(question.photoUrl || "");
			setCorrect(question.points.correct);
			setWrong(question.points.wrong);
			setEmpty(question.points.empty);
			setAnswerOptions(question.answerOptions);
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
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>

					<Text mb="-1rem">Photo</Text>
					<FileUpload uploadType="photo" defaultPhotoUrl={photoUrl} ref={photoRef} />

					<QuestionPoints />

					<EditAnswerOptions />
				</FormInputsContainer>

				<Divider />

				<FormButtonsContainer className="editQuestion__buttons--full">
					<Button variant="neutral" onClick={handleClose}>
						Cancel
					</Button>

					<Button variant="neutral">Preview</Button>
					<LoadingButton type="submit" variant="accent" full loading={loading}>
						{question == undefined ? "Create" : "Update"} question
					</LoadingButton>
				</FormButtonsContainer>

				<div className="editQuestion__buttons--small">
					<Button variant="neutral" className="editQuestion__preview">
						Preview
					</Button>
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
