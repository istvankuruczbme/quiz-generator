import { FC, FormEvent, HTMLAttributes } from "react";
// Components
import QuizVisibilitySelect from "../../../../../components/form/Select/QuizVisibilitySelect/QuizVisibilitySelect";
import QuestionOrderSelect from "../../../../../components/form/Select/QuestionOrderSelect/QuestionOrderSelect";
// Hooks
import useQuizData from "../../../hooks/useQuizData";
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
// Variables
import { QuizVisibility } from "../../../assets/quizVisibility";
import { QuestionOrder } from "../../../assets/questionOrder";
// CSS
import "./EditQuizConfigSection.css";
import updateQuizConfig from "../../../sevices/updateQuizConfig";

type EditQuizConfigSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizConfigSection: FC<EditQuizConfigSectionProps> = () => {
	// #region Hooks
	const { quiz, updateQuizState } = useQuizPrivate();
	const { visibility, setVisibility, questionOrder, setQuestionOrder } = useQuizData(quiz);
	//#endregion

	// #region Functions
	async function handleUpdateQuizConfig(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Check quiz
		if (quiz == null) return;

		try {
			// Update quiz config
			await updateQuizConfig(quiz.id, visibility, questionOrder);
		} catch (err) {
			console.log("Error updating quiz config.", err);
			return;
		}

		// Update quiz state
		await updateQuizState();
		console.log("Quiz config updated.");
	}
	//#endregion

	return (
		<section>
			<h2>Quiz config</h2>

			<form onSubmit={handleUpdateQuizConfig}>
				<QuizVisibilitySelect
					value={visibility}
					onChange={(e) => setVisibility(e.target.value as QuizVisibility)}
				/>

				<QuestionOrderSelect
					value={questionOrder}
					onChange={(e) => setQuestionOrder(e.target.value as QuestionOrder)}
				/>

				<button type="submit">Save</button>
			</form>
		</section>
	);
};

export default EditQuizConfigSection;
