import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatSignedValue from "../../../../../utils/formatting/formatSignedValue";
import { CompletionQuestionPrivate } from "../../../../completionQuestion/types/completionQuestionTypes";
import CompletionOverviewAnswerOption from "../CompletionOverviewAnswerOption/CompletionOverviewAnswerOption";
import "./CompletionOverviewQuestion.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import checkSameArrayElements from "../../../../../utils/array/checkSameArrayElements";
import calculateCompletionQuestionPoints from "../../../../completionQuestion/utils/calculateCompletionQuestionPoints";

type Props = {
	question: CompletionQuestionPrivate;
};

const CompletionOverviewQuestion = ({ question }: Props) => {
	//#region Constants
	const points = calculateCompletionQuestionPoints(question);

	const correctAnswerOptionIds = question.answerOptions
		.filter((option) => option.isCorrect)
		.map((option) => option.id);
	const correct = checkSameArrayElements(
		question.completion.selectedAnswerOptionIds,
		correctAnswerOptionIds
	);
	const wrong = question.completion.selectedAnswerOptionIds.every(
		(optionId) => !correctAnswerOptionIds.includes(optionId)
	);

	const variant = correct ? "correct" : wrong ? "wrong" : "empty";
	//#endregion

	return (
		<div className="completionOverviewQuestion">
			<div className="completionOverviewQuestion__points">
				<span className="completionOverviewQuestion__points__label">Points:</span>
				<div className="completionOverviewQuestion__points__items">
					<span className="completionOverviewQuestion__points__item completionOverviewQuestion__points__item--correct">
						{formatSignedValue(question.points.correct)}
					</span>
					<span className="completionOverviewQuestion__points__item completionOverviewQuestion__points__item--wrong">
						{formatSignedValue(question.points.wrong)}
					</span>
					<span className="completionOverviewQuestion__points__item completionOverviewQuestion__points__item--empty">
						{formatSignedValue(question.points.empty)}
					</span>
				</div>

				<FontAwesomeIcon
					icon={faArrowRight}
					className="completionOverviewQuestion__points__arrow"
				/>

				<span
					className={`completionOverviewQuestion__points__item completionOverviewQuestion__points__item--${variant}`}
				>
					{formatSignedValue(points)}
				</span>
			</div>

			<h4 className="completionOverviewQuestion__title">{question.text}</h4>

			{question.photoUrl && (
				<img src={question.photoUrl} className="completionOverviewQuestion__img" />
			)}

			<div className="completionOverviewQuestion__answerOptions">
				{question.answerOptions.map((option) => (
					<CompletionOverviewAnswerOption
						key={option.id}
						answerOption={option}
						completion={question.completion}
					/>
				))}
			</div>
		</div>
	);
};

export default CompletionOverviewQuestion;
