import { CSSProperties, FC, HTMLAttributes } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// Components
import QuestionListItemPoints from "./QuestionListItemPoints/QuestionListItemPoints";
import QuestionListItemPoint from "./QuestionListItemPoint/QuestionListItemPoint";
import FlexContainer from "../../../../../components/layout/FlexContainer/FlexContainer";
import QuestionListItemAnswerOption from "./QuestionListItemAnswerOption/QuestionListItemAnswerOption";
import QuestionListItemDropdown from "./QuestionListItemDropdown/QuestionListItemDropdown";
import Text from "../../../../../components/ui/Text/Text";
import Divider from "../../../../../components/ui/Divider/Divider";
// Hooks
import useQuestion from "../../../contexts/QuestionContext/useQuestion";
// Functions
import addPropClassName from "../../../../../utils/addPropClassName";
// CSS
import "./QuestionListItem.css";

type QuestionListItemProps = HTMLAttributes<HTMLDivElement>;
type QuestionListItemChildren = {
	Points: typeof QuestionListItemPoints;
	Point: typeof QuestionListItemPoint;
	AnswerOption: typeof QuestionListItemAnswerOption;
};
type QuestionListItemComponent = FC<QuestionListItemProps> & QuestionListItemChildren;

const QuestionListItem: QuestionListItemComponent = ({ className }) => {
	// #region Hooks
	const { question } = useQuestion();
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

	return (
		<div
			style={style}
			{...attributes}
			{...listeners}
			ref={setNodeRef}
			className={`questionListItem${addPropClassName(className)}`}
		>
			<header className="questionListItem__header">
				<div className="questionListItem__header__left">
					<h3 className="questionListItem__text">
						<span className="questionListItem__order">{question.order}.</span> {question.text}
					</h3>
				</div>

				<div onPointerDown={(e) => e.stopPropagation()}>
					<QuestionListItemDropdown />
				</div>
			</header>

			<div className="questionListItem__body">
				{question.photoUrl != null && (
					<img
						src={question.photoUrl}
						alt={question.text}
						className="questionListItem__photo"
					/>
				)}

				<FlexContainer direction="column" gap="1rem">
					{question.answerOptions.map((option) => (
						<QuestionListItem.AnswerOption key={option.id} answerOption={option} />
					))}
				</FlexContainer>

				<Divider my="1.5rem" />

				<FlexContainer gap="1rem">
					<Text mb="0">Points:</Text>
					<QuestionListItem.Points>
						<QuestionListItem.Point type="correct" number={question.points.correct} />
						<QuestionListItem.Point type="wrong" number={question.points.wrong} />
						<QuestionListItem.Point type="empty" number={question.points.empty} />
					</QuestionListItem.Points>
				</FlexContainer>
			</div>
		</div>
	);
};

QuestionListItem.Points = QuestionListItemPoints;
QuestionListItem.Point = QuestionListItemPoint;
QuestionListItem.AnswerOption = QuestionListItemAnswerOption;

export default QuestionListItem;
