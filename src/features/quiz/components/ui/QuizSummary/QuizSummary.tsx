import { FC, HTMLAttributes } from "react";
import { QuizSummary as QuizSummaryType } from "../../../types/quizTypes";
// Components
import QuizSummaryCategory from "./QuizSummaryCategory/QuizSummaryCategory";
import QuizSummaryTitle from "./QuizSummaryTitle/QuizSummaryTitle";
import QuizSummarySubtitle from "./QuizSummarySubtitle/QuizSummarySubtitle";
import Text from "../../../../../components/ui/Text/Text";
import LinkButton from "../../../../../components/ui/Button/LinkButton/LinkButton";
// Hooks
import useUser from "../../../../../contexts/UserContext/useUser";
// Functions
import checkQuizWriteAccess from "../../../utils/checkQuizWriteAccess";
// Variables
import defaultQuizPhotoUrl from "../../../assets/defaultQuizPhotoUrl";
// CSS
import "./QuizSummary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble, faQuestion } from "@fortawesome/free-solid-svg-icons";

type QuizSummaryProps = HTMLAttributes<HTMLDivElement> & {
	quiz: QuizSummaryType;
};
type QuizSummaryChildren = {
	Title: typeof QuizSummaryTitle;
	Subtitle: typeof QuizSummarySubtitle;
	Category: typeof QuizSummaryCategory;
};
type QuizSummaryComponent = FC<QuizSummaryProps> & QuizSummaryChildren;

const QuizSummary: QuizSummaryComponent = ({ quiz }) => {
	// #region Hooks
	const { user } = useUser();
	//#endregion

	// #region Variables
	const isQuizzWritable = checkQuizWriteAccess(quiz, user);
	// #endregion

	return (
		<div className="quizSummary">
			<section>
				<img
					src={quiz.photoUrl || defaultQuizPhotoUrl}
					alt={quiz.title}
					className="quizSummary__img"
				/>

				<header className="quizSummary__header">
					<QuizSummary.Title>{quiz.title}</QuizSummary.Title>
					<QuizSummary.Category category={quiz.category} />
				</header>
			</section>

			<section>
				<QuizSummary.Subtitle>Description</QuizSummary.Subtitle>
				<Text mb="0">{quiz.description}</Text>
			</section>

			<section>
				<QuizSummary.Subtitle>Stats</QuizSummary.Subtitle>

				<div className="quizSummary__stat__container">
					<div className="quizSummary__stat">
						<FontAwesomeIcon icon={faQuestion} className="quizSummary__stat__icon" />
						<span className="quizSummary__stat__label">Questions:</span>
						<span className="quizSummary__stat__value">{quiz.questionCount}</span>
					</div>

					<div className="quizSummary__stat">
						<FontAwesomeIcon icon={faCheckDouble} className="quizSummary__stat__icon" />
						<span className="quizSummary__stat__label">Completions:</span>
						<span className="quizSummary__stat__value">{quiz.completionCount}</span>
					</div>
				</div>
			</section>

			<section className="quizSummary__section quizSummary__section--button">
				{!isQuizzWritable && (
					<LinkButton to="complete" full className="quizSummary__button">
						Start quiz
					</LinkButton>
				)}

				{isQuizzWritable && (
					<LinkButton to="edit" full className="quizSummary__button">
						Edit quiz
					</LinkButton>
				)}
			</section>
		</div>
	);
};

QuizSummary.Title = QuizSummaryTitle;
QuizSummary.Subtitle = QuizSummarySubtitle;
QuizSummary.Category = QuizSummaryCategory;

export default QuizSummary;
