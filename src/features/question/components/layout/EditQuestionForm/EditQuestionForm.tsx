import { ChangeEvent, FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
// Components
import NewAnswerOption from "../../../../answerOption/components/ui/NewAnswerOption/NewAnswerOption";
// Hooks
import useQuizPrivate from "../../../../quiz/contexts/QuizPrivateContext/useQuizPrivate";
import useQuestion from "../../../contexts/QuestionContext/useQuestion";
import useAnswerOptions from "../../../../answerOption/hooks/useAnswerOptions";
// Functions
import validateImageFile from "../../../../../utils/image/validateImageFile";
import createImageUrl from "../../../../../utils/image/createImageUrl";
import validateQuestionData from "../../../utils/validation/validateQuestionData";
import validateQuestionPointsData from "../../../utils/validation/validateQuestionPointsData";
import updateQuestion from "../../../services/updateQuestion";
import removeQuestionPhoto from "../../../services/removeQuestionPhoto";
// CSS
import "./EditQuestionForm.css";

type EditQuestionFormProps = HTMLAttributes<HTMLDivElement>;

const EditQuestionForm: FC<EditQuestionFormProps> = () => {
	// #region Hooks
	const { quiz, updateQuizState } = useQuizPrivate();
	const { question, setShowEditQuestionForm } = useQuestion();
	const { answerOptions, addAnswerOption, updateAnswerOption, removeAnswerOption } =
		useAnswerOptions(question.answerOptions);
	// #endregion

	//#region States
	const [photoUrl, setPhotoUrl] = useState(question.photoUrl);
	//#endregion

	// #region Refs
	const textRef = useRef<HTMLInputElement>(null);
	const photoRef = useRef<HTMLInputElement>(null);
	const pointsCorrectRef = useRef<HTMLInputElement>(null);
	const pointsWrongRef = useRef<HTMLInputElement>(null);
	const pointsEmptyRef = useRef<HTMLInputElement>(null);
	//#endregion

	// #region Functions
	function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
		// Get selected file
		const file = e.target.files?.[0];

		try {
			// Validate image file
			validateImageFile(file);
		} catch {
			setPhotoUrl("");
			return;
		}

		// Create image URL
		const photoUrl = createImageUrl(file as File);

		// Update photoURL state
		setPhotoUrl(photoUrl);
	}

	function hideEditQuestionForm() {
		setShowEditQuestionForm(false);
	}

	async function handleRemoveQuestionPhoto() {
		// Confirm
		const confirm = window.confirm("Are you sure you want to remove the photo of question?");
		if (!confirm) return;

		// Check quiz
		if (quiz == null) return;

		try {
			// Remove photo
			await removeQuestionPhoto(question.id, quiz.id);
		} catch (err) {
			console.log("Error removing the photo of question.", err);
			return;
		}

		// Update quiz state
		await updateQuizState();
		setPhotoUrl("");
		console.log("Question photo removed.");
	}

	async function handleEditQuestionSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Check quiz
		if (quiz == null) return;

		// Input values
		const text = textRef.current?.value;
		const photo = photoRef.current?.files?.[0];
		const pointsCorrect = parseFloat(pointsCorrectRef.current?.value || "");
		const pointsWrong = parseFloat(pointsWrongRef.current?.value || "");
		const pointsEmpty = parseFloat(pointsEmptyRef.current?.value || "");

		try {
			// Validation
			validateQuestionData(text, answerOptions);
			validateQuestionPointsData(pointsCorrect, pointsWrong, pointsEmpty);
		} catch (err) {
			console.log(err);
			return;
		}

		try {
			// Update question
			await updateQuestion(
				question.id,
				text as string,
				photo,
				question.order,
				{ correct: pointsCorrect, wrong: pointsWrong, empty: pointsEmpty },
				answerOptions,
				quiz.id
			);

			// Update quiz questions
			await updateQuizState();

			// Hide form
			hideEditQuestionForm();
		} catch (err) {
			console.log("Error adding the question to DB.", err);
		}
	}
	// #endregion

	return (
		<div>
			<h3>Edit question</h3>

			<form onSubmit={handleEditQuestionSubmit}>
				<label htmlFor="editQuestionText">Text</label>
				<input
					type="text"
					id="editQuestionText"
					placeholder="Text"
					defaultValue={question.text}
					required
					ref={textRef}
				/>
				<br />

				<label htmlFor="editQuestionPhoto">Photo</label>
				<input
					type="file"
					id="editQuestionPhoto"
					accept="image/*"
					onChange={handleFileChange}
					ref={photoRef}
				/>
				<button type="button" onClick={handleRemoveQuestionPhoto}>
					Remove photo
				</button>
				<br />
				<img src={photoUrl || undefined} alt="New question" />

				<p>Points:</p>
				<label htmlFor="editQuestionPointsCorrect">Correct</label>
				<input
					type="number"
					id="editQuestionPointsCorrect"
					placeholder="Correct"
					defaultValue={question.points.correct}
					required
					ref={pointsCorrectRef}
				/>
				<br />

				<label htmlFor="editQuestionPointsWrong">Wrong</label>
				<input
					type="number"
					id="editQuestionPointsWrong"
					placeholder="Wrong"
					defaultValue={question.points.wrong}
					required
					ref={pointsWrongRef}
				/>
				<br />

				<label htmlFor="editQuestionPointsEmpty">Empty</label>
				<input
					type="number"
					id="editQuestionPointsEmpty"
					placeholder="Empty"
					defaultValue={question.points.empty}
					required
					ref={pointsEmptyRef}
				/>
				<br />

				<p>Answer options:</p>
				{answerOptions.length === 0 && <p>No options.</p>}
				{answerOptions.map((option) => (
					<NewAnswerOption
						key={option.id}
						option={option}
						updateAnswerOption={updateAnswerOption}
						removeAnswerOption={removeAnswerOption}
					/>
				))}

				<button type="button" onClick={addAnswerOption}>
					New option
				</button>
				<br />

				<br />
				<button type="button" onClick={hideEditQuestionForm}>
					Cancel
				</button>
				<button type="submit">Update question</button>
			</form>
		</div>
	);
};

export default EditQuestionForm;
