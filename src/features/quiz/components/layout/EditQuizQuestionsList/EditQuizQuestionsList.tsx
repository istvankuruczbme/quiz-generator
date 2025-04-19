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
import Skeleton from "../../../../../components/ui/Skeleton/Skeleton";
import FlexContainer from "../../../../../components/layout/FlexContainer/FlexContainer";
import Text from "../../../../../components/ui/Text/Text";
// Hooks
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import useEditQuiz from "../../../contexts/EditQuizContext/useEditQuiz";
import { useParams } from "react-router-dom";
import useError from "../../../../ui/error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
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
	const { updateQuestionsOrder, updateQuizState } = useQuizPrivate();
	const { loadingGeneration } = useEditQuiz();
	const { quizId } = useParams();
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
	);
	const { setError } = useError();
	const { setFeedback } = useFeedback();
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

		// Validate quiz ID
		if (quizId == undefined) return;

		try {
			// Update question order in DB
			await updateQuizQuestionsOrder(quizId, newQuestionOrder);

			// Update state
			await updateQuizState();

			// Show feedback
			setFeedback({
				type: "success",
				message: "Question order updated.",
			});
		} catch (err) {
			// console.log("Error updating the order of questions.", err);
			setError(err);
		}
	}
	//#endregion

	return (
		<FlexContainer direction="column" gap="2rem" className="editQuizQuestionsList">
			{questions.length === 0 && <Text mb="0">No questions.</Text>}

			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragEnd={handleDragEnd}
			>
				<SortableContext items={questions} strategy={verticalListSortingStrategy}>
					{loadingGeneration && (
						<>
							<Skeleton type="rect" width="100%" height="250px" />
							<Skeleton type="rect" width="100%" height="250px" />
						</>
					)}
					{questions.map((question) => (
						<QuestionProvider key={question.id} question={question} />
					))}
				</SortableContext>
			</DndContext>
		</FlexContainer>
	);
};

export default EditQuizQuestionsList;
