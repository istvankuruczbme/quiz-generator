import { Link } from "react-router-dom";
import Button from "../../../../../components/ui/Button/Button";
import ProgressBar from "../../../../../components/ui/ProgressBar/ProgressBar";
import QuizCategory from "../../../../quiz/components/ui/QuizCard/QuizCategory/QuizCategory";
import { CompletionPublic } from "../../../types/completionTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Card from "../../../../../components/ui/Card/Card";
import defaultQuizPhotoUrl from "../../../../quiz/assets/defaultQuizPhotoUrl";
import "./CompletionCard.css";

type Props = {
	completion: CompletionPublic;
};

const CompletionCard = ({ completion }: Props) => {
	// #region Constants
	const href = completion.finishedAt
		? `/quizzes/${completion.quiz.id}/completions/${completion.id}/overview`
		: `/quizzes/${completion.quiz.id}/completions/${completion.id}`;

	const finished = completion.finishedAt != null;

	const completedQuestions = completion.quiz.questions.filter(
		(question) => question.completion != undefined
	).length;
	const totalQuestions = completion.quiz.questions.length;
	// #endregion

	return (
		<Link to={href} className="completionCard">
			<Card>
				<Card.Image
					src={completion.quiz.photoUrl ?? defaultQuizPhotoUrl}
					alt={completion.quiz.title}
				/>

				<Card.Body className="completionCard__body">
					<div className="completionCard__body__top">
						<h4 className="completionCard__quiz__title">{completion.quiz.title}</h4>
						<QuizCategory category={completion.quiz.category} />
					</div>

					{!finished && (
						<div className="completionCard__progress">
							<span className="completionCard__progress__questions">
								{completedQuestions}/{totalQuestions}
							</span>
							<ProgressBar value={completedQuestions} max={totalQuestions} />
						</div>
					)}

					<div className="completionCard__dates">
						<div className="completionCard__date">
							<span className="completionCard__date__label">Started:</span>
							<span className="completionCard__date__value">
								{new Date(completion.createdAt ?? 0).toLocaleString()}
							</span>
						</div>
						{finished && (
							<div className="completionCard__date">
								<span className="completionCard__date__label">Finished:</span>
								<span className="completionCard__date__value">
									{new Date(completion.finishedAt ?? 0).toLocaleString()}
								</span>
							</div>
						)}
					</div>

					{finished && (
						<Button variant="secondary" className="completionCard__button">
							View
							<FontAwesomeIcon icon={faArrowRight} />
						</Button>
					)}
					{!finished && (
						<Button variant="secondary" className="completionCard__button">
							Continue
							<FontAwesomeIcon icon={faArrowRight} />
						</Button>
					)}
				</Card.Body>
			</Card>
		</Link>
	);
};

export default CompletionCard;
