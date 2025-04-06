import { FC, HTMLAttributes } from "react";
// Hooks
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import { useNavigate } from "react-router-dom";
// Functions
import finishQuiz from "../../../sevices/finishQuiz";
// CSS
import "./EditQuizFinishSection.css";

type EditQuizFinishSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizFinishSection: FC<EditQuizFinishSectionProps> = () => {
	//#region Hooks
	const { quiz, updateQuizState } = useQuizPrivate();
	const navigate = useNavigate();
	// #endregion

	// #region Functions
	async function handleFinishQuiz() {
		// Confirm
		const confirm = window.confirm("Are you sure you want to finish the quiz?");
		if (!confirm) return;

		// Check quiz
		if (quiz == null) return;

		try {
			// Finish quiz
			await finishQuiz(quiz.id);
		} catch (err) {
			console.log("Error finishing the quiz.", err);
			return;
		}

		// Update quiz state
		await updateQuizState();

		// Navigate to My quizzes page
		navigate("/my-quizzes");
		console.log("Quiz finished.");
	}
	//#endregion

	return (
		<section>
			<hr />
			<button type="button" onClick={handleFinishQuiz}>
				Finish quiz
			</button>
		</section>
	);
};

export default EditQuizFinishSection;
