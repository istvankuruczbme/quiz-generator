import { FC, HTMLAttributes, useState } from "react";
// Components
import NewQuestionForm from "../../../../question/components/layout/NewQuestionForm/NewQuestionForm";
import EditQuizQuestionsFromFile from "../EditQuizQuestionsFromFile/EditQuizQuestionsFromFile";
import EditQuizQuestionsList from "../EditQuizQuestionsList/EditQuizQuestionsList";
// Hooks
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
// CSS
import "./EditQuizQuestionsSection.css";

type EditQuizQuestionsSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizQuestionsSection: FC<EditQuizQuestionsSectionProps> = () => {
	// #region States
	const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
	//#endregion

	// #region Hooks
	const { quiz } = useQuizPrivate();
	//#endregion

	if (quiz == null) return null;
	return (
		<div>
			<h2>Questions</h2>

			<EditQuizQuestionsFromFile />

			<EditQuizQuestionsList questions={quiz.questions} />

			{showNewQuestionForm && <NewQuestionForm hideForm={() => setShowNewQuestionForm(false)} />}

			<br />
			{!showNewQuestionForm && (
				<button onClick={() => setShowNewQuestionForm(true)}>New question</button>
			)}
		</div>
	);
};

export default EditQuizQuestionsSection;
