import { ChangeEvent, FC, FormEvent, HTMLAttributes, useRef } from "react";
// Components
import CategorySelect from "../../../../../components/form/Select/CategorySelect/CategorySelect";
// Hooks
import useQuizData from "../../../hooks/useQuizData";
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
// Functions
import validateImageFile from "../../../../../utils/image/validateImageFile";
import createImageUrl from "../../../../../utils/image/createImageUrl";
import validateQuizData from "../../../utils/validation/validateQuizData";
import updateQuizData from "../../../sevices/updateQuizData";
// CSS
import "./EditQuizDataSection.css";

type EditQuizDataSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizDataSection: FC<EditQuizDataSectionProps> = () => {
	// #region Refs
	const photoRef = useRef<HTMLInputElement>(null);
	//#endregion

	// #region Hooks
	const { quiz, updateQuizState } = useQuizPrivate();
	const {
		title,
		setTitle,
		description,
		setDescription,
		photoUrl,
		setPhotoUrl,
		category,
		setCategory,
	} = useQuizData(quiz);
	// #endregion

	//#region Functions
	function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
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

	async function handleUpdateQuizData(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Check quiz
		if (quiz == null) return;

		// Input values
		const photo = photoRef.current?.files?.[0];

		try {
			// Validation
			validateQuizData(title, description, category);
		} catch (err) {
			console.log(err);
			return;
		}

		try {
			// Update quiz data
			await updateQuizData(quiz.id, title as string, description as string, photo, category);
		} catch (err) {
			console.log("Error updating quiz data.", err);
			return;
		}

		// Update quiz state
		await updateQuizState();
		console.log("Quiz data upated");
	}
	//#endregion

	return (
		<section>
			<h2>Quiz data</h2>

			<form onSubmit={handleUpdateQuizData}>
				<label htmlFor="editQuizTitle">Title</label>
				<input
					type="text"
					id="editQuizTitle"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<br />

				<label htmlFor="editQuizDescription">Description</label>
				<textarea
					id="editQuizDescription"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				></textarea>
				<br />

				<label htmlFor="editQuizPhoto">Cover photo</label>
				<input
					type="file"
					id="editQuizPhoto"
					accept="image/*"
					onChange={handleFileChange}
					ref={photoRef}
				/>
				<br />
				<img src={photoUrl || undefined} alt={title} />
				<br />

				<CategorySelect value={category} onChange={(e) => setCategory(e.target.value)} />

				<button type="submit">Save</button>
			</form>
		</section>
	);
};

export default EditQuizDataSection;
