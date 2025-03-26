import { FC, HTMLAttributes } from "react";
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

type EditQuizConfigSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizConfigSection: FC<EditQuizConfigSectionProps> = () => {
	// #region Hooks
	const { quiz } = useQuizPrivate();
	const { visibility, setVisibility, questionOrder, setQuestionOrder } = useQuizData(quiz);
	//#endregion

	return (
		<section>
			<h2>Quiz config</h2>
			<form>
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
