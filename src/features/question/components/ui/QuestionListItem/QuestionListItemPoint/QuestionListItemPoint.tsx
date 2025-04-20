import { FC, HTMLAttributes } from "react";
import { QuestionPoints } from "../../../../types/questionTypes";
import Tooltip from "../../../../../../components/ui/Tooltip/Tooltip";
import TooltipText from "../../../../../../components/ui/Tooltip/TooltipText/TooltipText";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./QuestionListItemPoint.css";

type QuestionListItemPointProps = HTMLAttributes<HTMLDivElement> & {
	type: keyof QuestionPoints;
	number: number;
};

const QuestionListItemPoint: FC<QuestionListItemPointProps> = ({ type, number, className }) => {
	// #region Variables
	const tooltipText =
		type === "correct"
			? "Points for correct answer."
			: type === "wrong"
			? "Points for wrong answer"
			: "Points for correct answer left blank";
	// #endregion

	return (
		<div
			className={`questionListItemPoint questionListItemPoint--${type}${addPropClassName(
				className
			)}`}
		>
			<Tooltip align="right">
				<TooltipText>{tooltipText}</TooltipText>
			</Tooltip>
			{number > 0 ? "+" : ""}
			{number}
		</div>
	);
};

export default QuestionListItemPoint;
