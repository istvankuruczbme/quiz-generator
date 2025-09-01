import { EditQuestionFormData } from "../constants/formData";
import { QuestionData } from "./validation/schemas/questionSchema";

export default function transformQuestionData(data: EditQuestionFormData): QuestionData {
	return {
		text: data.text,
		photoUrl: data.photoUrl,
		photo: data.photo,
		points: {
			correct: parseFloat(data.correct),
			wrong: parseFloat(data.wrong),
			empty: parseFloat(data.empty),
		},
		answerOptions: data.answerOptions,
	};
}
