import { FC, HTMLAttributes } from "react";
import { QuizSummary } from "../../../types/quizTypes";
// Components
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheckDouble, faQuestion } from "@fortawesome/free-solid-svg-icons";
import QuizCategory from "./QuizCategory/QuizCategory";
import QuizCardHeader from "./QuizCardHeader/QuizCardHeader";
import QuizCardTitle from "./QuizCardTitle/QuizCardTitle";
import QuizCardBody from "./QuizCardBody/QuizCardBody";
import QuizCount from "../QuizCount/QuizCount";
import Text from "../../../../../components/ui/Text/Text";
import Button from "../../../../../components/ui/Button/Button";
// Functions
import addPropClassName from "../../../../../utils/addPropClassName";
// Variables
import defaultQuizPhotoUrl from "../../../assets/defaultQuizPhotoUrl";
// CSS
import "./QuizCard.css";

type QuizCardProps = HTMLAttributes<HTMLDivElement> & {
	quiz: QuizSummary;
};
type QuizCardChildren = {
	Header: typeof QuizCardHeader;
	Title: typeof QuizCardTitle;
	Category: typeof QuizCategory;
	Body: typeof QuizCardBody;
	Count: typeof QuizCount;
};
type QuizCardComponent = FC<QuizCardProps> & QuizCardChildren;

const QuizCard: QuizCardComponent = ({ quiz, className }) => {
	return (
		<Link to={`/quizzes/${quiz.id}`} className={`quizCard${addPropClassName(className)}`}>
			<img
				src={quiz.photoUrl || defaultQuizPhotoUrl}
				alt={quiz.title}
				className="quizCard__img"
			/>

			<QuizCard.Header>
				<QuizCard.Title>{quiz.title}</QuizCard.Title>
				<QuizCard.Category category={quiz.category} />
			</QuizCard.Header>

			<QuizCard.Body className="quizCard__body">
				<Text variant="neutral-400" mb="0" className="quizCard__description">
					{quiz.description}
				</Text>

				<div className="quizCard__counts">
					<QuizCard.Count
						icon={faQuestion}
						count={quiz.questionCount}
						title="Number of questions"
					/>
					<QuizCard.Count
						icon={faCheckDouble}
						count={quiz.completionCount}
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
QuizCard.Category = QuizCategory;
QuizCard.Body = QuizCardBody;
QuizCard.Count = QuizCount;

export default QuizCard;
