import { FC, HTMLAttributes } from "react";
// Components
import Page from "../../../../components/layout/Page/Page";
import QuizSection from "../../components/layout/QuizSection/QuizSection";
import BackButton from "../../../../components/ui/Button/BackButton/BackButton";
import QuizSummary from "../../components/ui/QuizSummary/QuizSummary";
import QuizSummaryLoading from "../../components/ui/QuizSummary/QuizSummaryLoading/QuizSummaryLoading";
// Hooks
import useUser from "../../../../contexts/UserContext/useUser";
import useQuizSummary from "../../hooks/useQuizSummary";
// CSS
import "./Quiz.css";

type QuizProps = HTMLAttributes<HTMLDivElement>;

const Quiz: FC<QuizProps> = () => {
	// #region Hooks
	const { user } = useUser();
	const { quizSummary, loading } = useQuizSummary();
	//#endregion

	// #region Variables
	const isUserQuiz = quizSummary == null || user == null ? false : quizSummary.user.id === user.id;
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
		</Page>
	);
};

export default Quiz;
