import { FC, HTMLAttributes } from "react";
// Hooks
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import { useNavigate } from "react-router-dom";
// Functions
import deleteQuiz from "../../../sevices/deleteQuiz";
// CSS
import "./EditQuizDeleteSection.css";

type EditQuizDeleteSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizDeleteSection: FC<EditQuizDeleteSectionProps> = () => {
	// #region Hooks
	const { quiz } = useQuizPrivate();
	const navigate = useNavigate();
	//#endregion

	//#region Functions
	async function handleQuizDelete() {
		// Confirm
		const confirm = window.confirm("Are you sure you want to delete the quiz?");
		if (!confirm) return;

		// Check quiz
		if (quiz == null) return;

		try {
			// Delete quiz
			await deleteQuiz(quiz.id);
		} catch (err) {
			console.log("Error deleting the quiz.", err);
			return;
		}

		// Navigate ti My quizzes page
		navigate("/my-quizzes");
	}
	//#endregion

	return (
		<section>
			<hr />
			<button onClick={handleQuizDelete}>Delete quiz</button>
		</section>
	);
};

export default EditQuizDeleteSection;
