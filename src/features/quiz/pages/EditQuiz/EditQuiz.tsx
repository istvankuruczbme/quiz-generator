import { ChangeEvent, FC, HTMLAttributes } from "react";
// Components
import { Link } from "react-router-dom";
import CategorySelect from "../../../../components/form/Select/CategorySelect/CategorySelect";
// Hooks
import useQuiz from "../../hooks/useQuiz";
import useQuizData from "../../hooks/useQuizData";
// Functions
import validateImageFile from "../../../../utils/image/validateImageFile";
import createImageUrl from "../../../../utils/image/createImageUrl";
// CSS
import "./EditQuiz.css";

type EditQuizProps = HTMLAttributes<HTMLDivElement>;

const EditQuiz: FC<EditQuizProps> = () => {
	//#region Hooks
	const { quiz } = useQuiz();
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
	//#endregion

	// #region Functions
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
	//#endregion

	if (quiz == null) return null;
	return (
		<div>
			<h1>Edit quiz</h1>

			<Link to="/my-quizzes">
				<button tabIndex={-1}>My quizzes</button>
			</Link>

			<h2>Quiz data</h2>
			<form>
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
				<input type="file" id="editQuizPhoto" accept="image/*" onChange={handleFileChange} />
				<br />
				<img src={photoUrl || undefined} alt={title} />
				<br />

				<CategorySelect value={category} onChange={(e) => setCategory(e.target.value)} />
				<br />
			</form>

			<h2>Quiz config</h2>

			<h2>Questions</h2>
		</div>
	);
};

export default EditQuiz;
