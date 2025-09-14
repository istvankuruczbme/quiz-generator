import { FC, HTMLAttributes } from "react";
import { QuizSummary } from "../../../types/quizTypes";
// Components
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheckDouble, faQuestion } from "@fortawesome/free-solid-svg-icons";
import QuizCategory from "./QuizCategory/QuizCategory";
import QuizCount from "../QuizCount/QuizCount";
import Text from "../../../../../components/ui/Text/Text";
import Button from "../../../../../components/ui/Button/Button";
// Functions
import addPropClassName from "../../../../../utils/addPropClassName";
// Variables
import defaultQuizPhotoUrl from "../../../assets/defaultQuizPhotoUrl";
// CSS
import "./QuizCard.css";
import Card from "../../../../../components/ui/Card/Card";

type QuizCardProps = HTMLAttributes<HTMLDivElement> & {
	quiz: QuizSummary;
};
type QuizCardChildren = {
	Category: typeof QuizCategory;
	Count: typeof QuizCount;
};
type QuizCardComponent = FC<QuizCardProps> & QuizCardChildren;

const QuizCard: QuizCardComponent = ({ quiz, className }) => {
	return (
		<Link to={`/quizzes/${quiz.id}`} className={`quizCard${addPropClassName(className)}`}>
			<Card>
				<Card.Image src={quiz.photoUrl ?? defaultQuizPhotoUrl} alt={quiz.title} />

				<Card.Body>
					<div className="quizCard__title">
						<h3 className="quizCard__title__heading">{quiz.title}</h3>
						<QuizCard.Category category={quiz.category} />
					</div>

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
				</Card.Body>
			</Card>
		</Link>
	);
};

QuizCard.Category = QuizCategory;
QuizCard.Count = QuizCount;

export default QuizCard;
