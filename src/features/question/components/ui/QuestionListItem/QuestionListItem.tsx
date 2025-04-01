import { CSSProperties, FC, HTMLAttributes } from "react";
import { QuestionPrivate } from "../../../types/questionTypes";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// Hooks
import useQuizPrivate from "../../../../quiz/contexts/QuizPrivateContext/useQuizPrivate";
// Functions
import addPropClassName from "../../../../../utils/addPropClassName";
import deleteQuestion from "../../../services/deleteQuestion";
// CSS
import "./QuestionListItem.css";

type QuestionListItemProps = HTMLAttributes<HTMLDivElement> & {
	question: QuestionPrivate;
};

const QuestionListItem: FC<QuestionListItemProps> = ({ question, className }) => {
	// #region Hooks
	const { quiz, updateQuizState } = useQuizPrivate();
	const { attributes, listeners, transform, transition, setNodeRef } = useSortable({
		id: question.id,
	});
	//#endregion

	// #region Variables
	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	//#endregion

	//#region Functions
	async function handleQuestionDelete() {
		// Confirm
		const confirm = window.confirm("Are you sure you want to delete the question?");
		if (!confirm) return;

		// Check quiz
		if (quiz == null) return;

		try {
			// Delete question
			await deleteQuestion(quiz.id, question.id);

			// Update quiz state
			await updateQuizState();
		} catch (err) {
			console.log("Error deleting the question.", err);
		}
	}
	//#endregion

	return (
		<div
			style={style}
			{...attributes}
			{...listeners}
			ref={setNodeRef}
			className={`questionListItem${addPropClassName(className)}`}
		>
			<p>{JSON.stringify(question)}</p>

			<div onPointerDown={(e) => e.stopPropagation()}>
				<button>Edit</button>
				<button onClick={handleQuestionDelete}>Delete</button>
			</div>
		</div>
	);
};

export default QuestionListItem;
