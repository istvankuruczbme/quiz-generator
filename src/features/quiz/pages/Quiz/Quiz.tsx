import { FC, HTMLAttributes } from "react";
// Components
import Page from "../../../../components/layout/Page/Page";
import QuizSection from "../../components/layout/QuizSection/QuizSection";
import BackButton from "../../../../components/ui/Button/BackButton/BackButton";
import QuizSummary from "../../components/ui/QuizSummary/QuizSummary";
import QuizSummaryLoading from "../../components/ui/QuizSummary/QuizSummaryLoading/QuizSummaryLoading";
import LinkButton from "../../../../components/ui/Button/LinkButton/LinkButton";
import Skeleton from "../../../../components/ui/Skeleton/Skeleton";
import LoadingButton from "../../../../components/ui/Button/LoadingButton/LoadingButton";
// Hooks
import useUser from "../../../../contexts/UserContext/useUser";
import useQuizSummary from "../../hooks/useQuizSummary";
import useCreateCompletion from "../../../completion/hooks/useCreateCompletion";
import useError from "../../../error/hooks/useError";
import { useNavigate } from "react-router-dom";
// Functions
import checkQuizWriteAccess from "../../utils/checkQuizWriteAccess";
// CSS
import "./Quiz.css";

type QuizProps = HTMLAttributes<HTMLDivElement>;

const Quiz: FC<QuizProps> = () => {
	// #region Hooks
	const { user, loading: loadingUser } = useUser();
	const { quizSummary, loading: loadingQuiz } = useQuizSummary();
	const { mutateAsync, loading: loadingStartQuiz } = useCreateCompletion();
	const { setError } = useError();
	const navigate = useNavigate();
	//#endregion

	// #region Variables
	const isUserQuiz = quizSummary == null || user == null ? false : quizSummary.user.id === user.id;
	const isQuizWritable = checkQuizWriteAccess(quizSummary, user);
	const loading = loadingUser || loadingQuiz;
	//#endregion

	// #region Functions
	async function handleStartQuizClick() {
		// Check quiz
		if (!quizSummary) return;

		try {
			// Create completion
			const completion = await mutateAsync({ quizId: quizSummary.id });

			// Navigate
			navigate(`/quizzes/${quizSummary.id}/completions/${completion.id}`);
		} catch (err) {
			setError(err);
		}
	}
	// #endregion

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
				{quizSummary && <QuizSummary quiz={quizSummary} />}
			</QuizSection>

			<QuizSection className="quiz__button">
				{loading && <Skeleton type="circle" width="100%" height="3rem" />}

				{!loading && !isQuizWritable && (
					<LoadingButton full loading={loadingStartQuiz} onClick={handleStartQuizClick}>
						Start quiz
					</LoadingButton>
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
