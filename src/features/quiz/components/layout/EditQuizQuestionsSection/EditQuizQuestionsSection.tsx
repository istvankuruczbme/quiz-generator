import { FC, HTMLAttributes, useState } from "react";
import NewQuestionForm from "../../../../question/components/layout/NewQuestionForm/NewQuestionForm";
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import "./EditQuizQuestionsSection.css";

type EditQuizQuestionsSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizQuestionsSection: FC<EditQuizQuestionsSectionProps> = () => {
	// #region States
	const [showNewQuestionForm, setShowNewQuestionForm] = useState(true);
	//#endregion

	// #region Hooks
	const { quiz } = useQuizPrivate();
	//#endregion

	if (quiz == null) return null;
	return (
		<div>
			<h2>Questions</h2>

			{quiz.questions.length === 0 && <p>No questions.</p>}

			{showNewQuestionForm && <NewQuestionForm />}

			<br />
			<button>New question</button>
		</div>
	);
};

export default EditQuizQuestionsSection;
