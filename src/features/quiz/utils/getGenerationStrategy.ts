import { QuestionGenerationStrategy } from "../../question/types/questionTypes";

export default function getGenerationStrategy(
	random: boolean | undefined,
	tfidf: boolean | undefined,
	embedding: boolean | undefined
): QuestionGenerationStrategy {
	if (random === true) return "RANDOM";
	if (tfidf === true) return "TFIDF";
	if (embedding === true) return "EMBEDDING";
	return "RANDOM";
}
