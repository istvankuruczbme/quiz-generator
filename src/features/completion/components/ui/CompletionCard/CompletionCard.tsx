import { Link } from "react-router-dom";
import Button from "../../../../../components/ui/Button/Button";
import ProgressBar from "../../../../../components/ui/ProgressBar/ProgressBar";
import defaultQuizPhotoUrl from "../../../../quiz/assets/defaultQuizPhotoUrl";
import QuizCategory from "../../../../quiz/components/ui/QuizCard/QuizCategory/QuizCategory";
import { CompletionPublic } from "../../../types/completionTypes";
import "./CompletionCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
	completion: CompletionPublic;
};

const CompletionCard = ({ completion }: Props) => {
	// #region Constants
	const href = completion.finishedAt
		? `/quizzes/${completion.quiz.id}/completions/${completion.id}/overview`
		: `/quizzes/${completion.quiz.id}/completions/${completion.id}`;

	const completedQuestions = completion.quiz.questions.filter(
		(question) => question.completion != undefined
	).length;
	const totalQuestions = completion.quiz.questions.length;
	// #endregion

	return (
		<Link to={href} className="completionCard">
			<img
				src={completion.quiz.photoUrl ?? defaultQuizPhotoUrl}
				alt={completion.quiz.title}
				className="completionCard__img"
			/>

			<div className="completionCard__body">
				<div className="completionCard__body__top">
					<h4 className="completionCard__quiz__title">{completion.quiz.title}</h4>
					<QuizCategory category={completion.quiz.category} />
				</div>

				{completedQuestions !== totalQuestions && (
					<div className="completionCard__progress">
						<span className="completionCard__progress__questions">
							{completedQuestions}/{totalQuestions}
						</span>
						<ProgressBar value={completedQuestions} max={totalQuestions} />
					</div>
				)}

				{completion.finishedAt != null && (
					<Button variant="primary" className="completionCard__button">
						View
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				)}
				{completion.finishedAt == null && (
					<Button variant="primary" className="completionCard__button">
						Continue
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				)}
			</div>
		</Link>
	);
};

export default CompletionCard;
