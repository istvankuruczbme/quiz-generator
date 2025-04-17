import { FC, HTMLAttributes } from "react";
import "./QuizSummaryLoading.css";
import Skeleton from "../../../../../../components/ui/Skeleton/Skeleton";

type QuizSummaryLoadingProps = HTMLAttributes<HTMLDivElement>;

const QuizSummaryLoading: FC<QuizSummaryLoadingProps> = () => {
	return (
		<div className="quizSummaryLoading">
			{/* Photo */}
			<Skeleton type="rect" width="80%" height="400px" className="quizSummaryLoading__img" />

			{/* Title */}
			<Skeleton type="rect" width="100%" height="40px" />

			{/* Description */}
			<Skeleton type="rect" width="100%" height="150px" />

			{/* Stats */}
			<Skeleton type="rect" width="100%" height="150px" />

			{/* Button */}
			<Skeleton type="circle" width="100%" height="32px" />
		</div>
	);
};

export default QuizSummaryLoading;
