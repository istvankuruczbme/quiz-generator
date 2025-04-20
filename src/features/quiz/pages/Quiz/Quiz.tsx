import { FC, HTMLAttributes } from "react";
// Components
import Page from "../../../../components/layout/Page/Page";
import QuizSection from "../../components/layout/QuizSection/QuizSection";
import BackButton from "../../../../components/ui/Button/BackButton/BackButton";
import QuizSummary from "../../components/ui/QuizSummary/QuizSummary";
import QuizSummaryLoading from "../../components/ui/QuizSummary/QuizSummaryLoading/QuizSummaryLoading";
import LinkButton from "../../../../components/ui/Button/LinkButton/LinkButton";
// Hooks
import useUser from "../../../../contexts/UserContext/useUser";
import useQuizSummary from "../../hooks/useQuizSummary";
// Functions
import checkQuizWriteAccess from "../../utils/checkQuizWriteAccess";
// CSS
import "./Quiz.css";
import Skeleton from "../../../../components/ui/Skeleton/Skeleton";

type QuizProps = HTMLAttributes<HTMLDivElement>;

const Quiz: FC<QuizProps> = () => {
	// #region Hooks
	const { user } = useUser();
	const { quizSummary, loading } = useQuizSummary();
	//#endregion

	// #region Variables
	const isUserQuiz = quizSummary == null || user == null ? false : quizSummary.user.id === user.id;
	const isQuizWritable = checkQuizWriteAccess(quizSummary, user);
	//#endregion

	return (
		<Page className="quiz">
			<QuizSection>
				{!isUserQuiz && (
					<BackButton to="/browse" variant="primary" className="quiz__back">
						Quizzes
					</BackButton>
				)}
				{isUserQuiz && (
					<BackButton to="/my-quizzes" variant="primary" className="quiz__back">
						My quizzes
					</BackButton>
				)}
			</QuizSection>

			<QuizSection>
				{loading && <QuizSummaryLoading />}
				{quizSummary != null && <QuizSummary quiz={quizSummary} />}
			</QuizSection>

			<QuizSection className="quiz__button">
				{loading && <Skeleton type="circle" width="100%" height="3rem" />}

				{!loading && !isQuizWritable && (
					<LinkButton to="complete" full>
						Start quiz
					</LinkButton>
				)}

				{!loading && isQuizWritable && (
					<LinkButton to="edit" full>
						Edit quiz
					</LinkButton>
				)}
			</QuizSection>
		</Page>
	);
};

export default Quiz;
