import { FC, HTMLAttributes } from "react";
import { AnswerOptionPrivate } from "../../../../../answerOption/types/answerOptionTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import Text from "../../../../../../components/ui/Text/Text";
import "./QuestionListItemAnswerOption.css";

type QuestionListItemAnswerOptionProps = HTMLAttributes<HTMLDivElement> & {
	answerOption: AnswerOptionPrivate;
};

const QuestionListItemAnswerOption: FC<QuestionListItemAnswerOptionProps> = ({ answerOption }) => {
	return (
		<div
			className={`questionListItemAnswerOption questionListItemAnswerOption--${
				answerOption.isCorrect ? "correct" : "wrong"
			}`}
		>
			<FontAwesomeIcon
				icon={answerOption.isCorrect ? faCheckCircle : faXmarkCircle}
				className="questionListItem__answerOption__icon"
			/>
			<Text mb="0">{answerOption.text}</Text>
		</div>
	);
};

export default QuestionListItemAnswerOption;
