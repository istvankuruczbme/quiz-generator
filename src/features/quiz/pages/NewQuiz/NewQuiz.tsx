import { ChangeEvent, FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
// Hooks
import useCategories from "../../../category/hooks/useCategories";
import { useNavigate } from "react-router-dom";
// Functions
import validateQuizData from "../../utils/validation/validateQuizData";
import createQuiz from "../../sevices/createQuiz";
// CSS
import "./NewQuiz.css";

type NewQuizProps = HTMLAttributes<HTMLDivElement>;

const NewQuiz: FC<NewQuizProps> = () => {
	// #region States
	const [photoUrl, setPhotoUrl] = useState("");
	// #endregion

	// #region Hooks
	const { categories } = useCategories();
	const navigate = useNavigate();
	// #endregion

	// #region Refs
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const photoRef = useRef<HTMLInputElement>(null);
	const categoryRef = useRef<HTMLSelectElement>(null);
	//#endregion

	// #region Functions
	function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
		// Get selected file
		const file = e.target.files?.[0];

		// Check if there is a file
		if (file == undefined) return;

		// Validate image file type
		if (!file.type.startsWith("image/")) return;

		// Create image URL
		const photoUrl = URL.createObjectURL(file);

		// Update photoURL state
		setPhotoUrl(photoUrl);
	}

	async function handleCreateQuizSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Input values
		const title = titleRef.current?.value;
		const description = descriptionRef.current?.value;
		const photo = photoRef.current?.files?.[0];
		const categoryId = categoryRef.current?.value;

		try {
			// Validation
			validateQuizData(title, description, categoryId);
		} catch (err) {
			console.log(err);
			return;
		}

		try {
			// Create quiz
			const quiz = await createQuiz(
				title as string,
				description as string,
				photo,
				categoryId as string
			);

			// Navigation
			navigate(`/quizzes/${quiz.id}/edit`);
		} catch (err) {
			console.log("Error creating the quiz.", err);
		}
	}
	//#endregion

	return (
		<div>
			<h1>New quiz</h1>

			<form onSubmit={handleCreateQuizSubmit}>
				<label htmlFor="newQuizTitle">Title</label>
				<input type="text" id="newQuizTitle" placeholder="Title" required ref={titleRef} />
				<br />

				<label htmlFor="newQuizDescription">Description</label>
				<textarea
					id="newQuizDescription"
					placeholder="Description"
					required
					ref={descriptionRef}
				></textarea>
				<br />

				<label htmlFor="newQuizPhoto">Cover photo</label>
				<input
					type="file"
					id="newQuizPhoto"
					accept="image/*"
					onChange={handleFileChange}
					ref={photoRef}
				/>
				<br />
				<img src={photoUrl || undefined} alt="New quiz cover" />
				<br />

				<label htmlFor="newQuizCategory">Category</label>
				<select id="newQuizCategory" required ref={categoryRef}>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
				<br />

				<button type="submit">Create quiz</button>
			</form>
		</div>
	);
};

export default NewQuiz;
