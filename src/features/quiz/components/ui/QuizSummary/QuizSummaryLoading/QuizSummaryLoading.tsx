import { FC, HTMLAttributes } from "react";
import Skeleton from "../../../../../../components/ui/Skeleton/Skeleton";
import "./QuizSummaryLoading.css";

type QuizSummaryLoadingProps = HTMLAttributes<HTMLDivElement>;

const QuizSummaryLoading: FC<QuizSummaryLoadingProps> = () => {
	return (
		<div className="quizSummaryLoading">
			<Skeleton type="rect" width="100%" height="400px" />
			<Skeleton type="rect" width="100%" height="40px" />
			<Skeleton type="rect" width="25%" height="32px" />
			<Skeleton type="circle" width="32px" height="32px" />
		</div>
	);
};

export default QuizSummaryLoading;
