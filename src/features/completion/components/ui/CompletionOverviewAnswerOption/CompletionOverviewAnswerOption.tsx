import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AnswerOptionPrivate } from "../../../../answerOption/types/answerOptionTypes";
import { CompletionQuestionPrivate } from "../../../../completionQuestion/types/completionQuestionTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CompletionOverviewAnswerOption.css";

type Props = {
	answerOption: AnswerOptionPrivate;
	completion: CompletionQuestionPrivate["completion"];
};

const CompletionOverviewAnswerOption = ({ answerOption, completion }: Props) => {
	// #region Constants
	const selected = completion.selectedAnswerOptionIds.includes(answerOption.id);
	const correct = answerOption.isCorrect && selected;
	const wrong = !answerOption.isCorrect && selected;
	const empty = answerOption.isCorrect && !selected;

	const variant = correct ? "success" : wrong ? "danger" : empty ? "warning" : "default";
	const icon = correct ? faCheck : wrong ? faXmark : empty ? faCheck : null;
	// #endregion

	return (
		<div className={`completionOverviewAnswerOption completionOverviewAnswerOption--${variant}`}>
			<div className="completionOverviewAnswerOption__marker">
				{icon && (
					<FontAwesomeIcon icon={icon} className="completionOverviewAnswerOption__icon" />
				)}
			</div>
			<span className="completionOverviewAnswerOption__text">{answerOption.text}</span>
		</div>
	);
};

export default CompletionOverviewAnswerOption;
