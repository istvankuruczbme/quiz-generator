import { FC, HTMLAttributes } from "react";
import { QuestionPrivate } from "../../../../question/types/questionTypes";
import {
	closestCorners,
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
// Components
import QuestionProvider from "../../../../question/contexts/QuestionContext/QuestionProvider";
// Hooks
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import { useParams } from "react-router-dom";
// Functions
import getElementIndexById from "../../../../../utils/array/getElementIndexById";
import updateQuizQuestionsOrder from "../../../../question/services/updateQuizQuestionsOrder";
// CSS
import "./EditQuizQuestionsList.css";

type EditQuizQuestionsListProps = HTMLAttributes<HTMLDivElement> & {
	questions: QuestionPrivate[];
};

const EditQuizQuestionsList: FC<EditQuizQuestionsListProps> = ({ questions }) => {
	// #region Hooks
	const { updateQuestionsOrder } = useQuizPrivate();
	const { quizId } = useParams();
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
	);
	//#endregion

	//#region Functions
	async function handleDragEnd(e: DragEndEvent) {
		// Get active and over elements
		const { active, over } = e;

		// Check over element
		if (over == null) return;

		// Check if they are the same
		if (active.id === over.id) return;

		// Get original and new index of question
		const originalIndex = getElementIndexById(questions, active.id as string);
		const newIndex = getElementIndexById(questions, over.id as string);

		// Create new array of questions
		const newQuestions = arrayMove(questions, originalIndex, newIndex);

		// Create question order data
		const newQuestionOrder = newQuestions.map((question) => question.id);

		// Update question order locally
		updateQuestionsOrder(newQuestionOrder);

		try {
			// Validate quiz ID
			if (quizId == undefined) throw new Error("quiz/invalid-id");
		} catch (err) {
			console.log(err);
			return;
		}

		try {
			// Update question order in DB
			await updateQuizQuestionsOrder(quizId, newQuestionOrder);

			console.log("Order updated.");
		} catch (err) {
			console.log("Error updating the order of questions.", err);
		}
	}
	//#endregion

	if (questions.length === 0) return <p>No questions.</p>;
	return (
		<DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
			<SortableContext items={questions} strategy={verticalListSortingStrategy}>
				{questions.map((question) => (
					<QuestionProvider key={question.id} question={question} />
				))}
			</SortableContext>
		</DndContext>
	);
};

export default EditQuizQuestionsList;
