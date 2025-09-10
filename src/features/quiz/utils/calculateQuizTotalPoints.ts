import { QuestionPublic } from "../../question/types/questionTypes";

export default function calculateQuizTotalPoints(questions: QuestionPublic[]): number {
	return questions.reduce((total, question) => total + question.points.correct, 0);
}
