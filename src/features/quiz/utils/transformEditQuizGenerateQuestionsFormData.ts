import { EditQuizQuestionGenerationTransformedData } from "../../question/types/questionTypes";
import { EditQuizQuestionGenerationFormData } from "../constants/formData";

export default function transformEditQuizGenerateQuestionsFormData(
	data: EditQuizQuestionGenerationFormData
): EditQuizQuestionGenerationTransformedData {
	return {
		file: data.file,
		strategy: data.strategy,
		creativity: data.creativity,
		questionCount: parseInt(data.questionCount),
		answerOptionCount: parseInt(data.answerOptionCount),
	};
}
