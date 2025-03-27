import { ChangeEvent, FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
import useAnswerOptions from "../../../../answerOption/hooks/useAnswerOptions";
import NewAnswerOption from "../../../../answerOption/components/ui/NewAnswerOption/NewAnswerOption";
import validateQuestionData from "../../../utils/validation/validateQuestionData";
import "./NewQuestionForm.css";
import useQuizPrivate from "../../../../quiz/contexts/QuizPrivateContext/useQuizPrivate";
import validateImageFile from "../../../../../utils/image/validateImageFile";
import createImageUrl from "../../../../../utils/image/createImageUrl";
import createQuestion from "../../../services/createQuestion";
import validateQuestionPointsData from "../../../utils/validation/validateQuestionPointsData";

type NewQuestionFormProps = HTMLAttributes<HTMLDivElement> & {
	hideForm: () => void;
};

const NewQuestionForm: FC<NewQuestionFormProps> = ({ hideForm }) => {
	// #region States
	const [photoUrl, setPhotoUrl] = useState("");
	// #endregion

	// #region Refs
	const textRef = useRef<HTMLInputElement>(null);
	const photoRef = useRef<HTMLInputElement>(null);
	const pointsCorrectRef = useRef<HTMLInputElement>(null);
	const pointsWrongRef = useRef<HTMLInputElement>(null);
	const pointsEmptyRef = useRef<HTMLInputElement>(null);
	//#endregion

	//#region Hooks
	const { quiz, updateQuizState } = useQuizPrivate();
	const { answerOptions, addAnswerOption, updateAnswerOption, removeAnswerOption } =
		useAnswerOptions();
	//#endregion

	//#region Functions
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

	async function handleNewQuestionSubmit(e: FormEvent<HTMLFormElement>) {
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
			// Create question
			await createQuestion(
				text as string,
				photo,
				quiz.questions.length + 1,
				{ correct: pointsCorrect, wrong: pointsWrong, empty: pointsEmpty },
				answerOptions,
				quiz.id
			);

			// Update quiz questions
			await updateQuizState();

			// Hide form
			hideForm();
		} catch (err) {
			console.log("Error adding the question to DB.", err);
		}
	}
	//#endregion

	return (
		<div>
			<h3>New question</h3>

			<form onSubmit={handleNewQuestionSubmit}>
				<label htmlFor="editQuizNewQuestionText">Text</label>
				<input
					type="text"
					id="editQuizNewQuestionText"
					placeholder="Text"
					required
					ref={textRef}
				/>
				<br />

				<label htmlFor="editQuizNewQuestionPhoto">Photo</label>
				<input
					type="file"
					id="editQuizNewQuestionPhoto"
					accept="image/*"
					onChange={handleFileChange}
					ref={photoRef}
				/>
				<br />
				<img src={photoUrl || undefined} alt="New question" />

				<p>Points:</p>
				<label htmlFor="editQuizNewQuestionPointsCorrect">Correct</label>
				<input
					type="number"
					id="editQuizNewQuestionPointsCorrect"
					placeholder="Correct"
					defaultValue={1}
					required
					ref={pointsCorrectRef}
				/>
				<br />

				<label htmlFor="editQuizNewQuestionPointsWrong">Wrong</label>
				<input
					type="number"
					id="editQuizNewQuestionPointsWrong"
					placeholder="Wrong"
					defaultValue={0}
					required
					ref={pointsWrongRef}
				/>
				<br />

				<label htmlFor="editQuizNewQuestionPointsEmpty">Empty</label>
				<input
					type="number"
					id="editQuizNewQuestionPointsEmpty"
					placeholder="Empty"
					defaultValue={0}
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
				<button type="button" onClick={hideForm}>
					Cancel
				</button>
				<button type="submit">Add question</button>
			</form>
		</div>
	);
};

export default NewQuestionForm;
