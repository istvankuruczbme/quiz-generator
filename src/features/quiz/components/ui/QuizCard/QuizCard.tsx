import { FC, HTMLAttributes } from "react";
import { QuizSummary } from "../../../types/quizTypes";
// Components
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheckDouble, faQuestion } from "@fortawesome/free-solid-svg-icons";
import QuizCardCategory from "./QuizCardCategory/QuizCardCategory";
import QuizCardHeader from "./QuizCardHeader/QuizCardHeader";
import QuizCardTitle from "./QuizCardTitle/QuizCardTitle";
import QuizCardBody from "./QuizCardBody/QuizCardBody";
import QuizCardCount from "./QuizCardCount/QuizCardCount";
import Text from "../../../../../components/ui/Text/Text";
import Button from "../../../../../components/ui/Button/Button";
// Functions
import addPropClassName from "../../../../../utils/addPropClassName";
// Variables
import defaultQuizPhotoUrl from "../../../assets/defaultQuizPhotoUrl";
// CSS
import "./QuizCard.css";

type QuizCardProps = HTMLAttributes<HTMLDivElement> & {
	quizSummary: QuizSummary;
};
type QuizCardChildren = {
	Header: typeof QuizCardHeader;
	Title: typeof QuizCardTitle;
	Category: typeof QuizCardCategory;
	Body: typeof QuizCardBody;
	Count: typeof QuizCardCount;
};
type QuizCardComponent = FC<QuizCardProps> & QuizCardChildren;

const QuizCard: QuizCardComponent = ({ quizSummary, className }) => {
	return (
		<Link to={`/quizzes/${quizSummary.id}`} className={`quizCard${addPropClassName(className)}`}>
			<img
				src={quizSummary.photoUrl || defaultQuizPhotoUrl}
				alt={quizSummary.title}
				className="quizCard__img"
			/>

			<QuizCard.Header>
				<QuizCard.Title>{quizSummary.title}</QuizCard.Title>
				<QuizCard.Category category={quizSummary.category} />
			</QuizCard.Header>

			<QuizCard.Body className="quizCard__body">
				<Text variant="neutral-400" mb="0" className="quizCard__description">
					{quizSummary.description}
				</Text>

				<div className="quizCard__counts">
					<QuizCard.Count
						icon={faQuestion}
						count={quizSummary.questionCount}
						title="Number of questions"
					/>
					<QuizCard.Count
						icon={faCheckDouble}
						count={quizSummary.completionCount}
						title="Number of completions"
					/>
				</div>

				<Button variant="secondary" className="quizCard__button">
					More
					<FontAwesomeIcon icon={faArrowRight} />
				</Button>
			</QuizCard.Body>
		</Link>
	);
};

QuizCard.Header = QuizCardHeader;
QuizCard.Title = QuizCardTitle;
QuizCard.Category = QuizCardCategory;
QuizCard.Body = QuizCardBody;
QuizCard.Count = QuizCardCount;

export default QuizCard;
