import { ChangeEvent, FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
import useAnswerOptions from "../../../../answerOption/hooks/useAnswerOptions";
import NewAnswerOption from "../../../../answerOption/components/ui/NewAnswerOption/NewAnswerOption";
import validateQuestionData from "../../../utils/validation/validateQuestionData";
import "./NewQuestionForm.css";
import useQuizPrivate from "../../../../quiz/contexts/QuizPrivateContext/useQuizPrivate";
import validateImageFile from "../../../../../utils/image/validateImageFile";
import createImageUrl from "../../../../../utils/image/createImageUrl";
import createQuestion from "../../../services/createQuestion";

type NewQuestionFormProps = HTMLAttributes<HTMLDivElement>;

const NewQuestionForm: FC<NewQuestionFormProps> = () => {
	// #region States
	const [photoUrl, setPhotoUrl] = useState("");
	// #endregion

	// #region Refs
	const textRef = useRef<HTMLInputElement>(null);
	const photoRef = useRef<HTMLInputElement>(null);
	//#endregion

	//#region Hooks
	const { quiz } = useQuizPrivate();
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
		} catch (err) {
			console.log(err);
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

		try {
			// Validation
			validateQuestionData(text, answerOptions);
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
				answerOptions,
				quiz.id
			);

			// Update quiz questions
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
				/>
				<br />
				<img src={photoUrl} alt="New question" />

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
				<button type="submit">Add question</button>
			</form>
		</div>
	);
};

export default NewQuestionForm;
