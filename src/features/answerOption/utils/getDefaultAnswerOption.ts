import generateUUID from "../../../utils/generateUUID";
import { AnswerOptionPrivate } from "../types/answerOptionTypes";

export default function getDefaultAnswerOption(): AnswerOptionPrivate {
	return {
		id: generateUUID(),
		text: "",
		isCorrect: false,
	};
}
