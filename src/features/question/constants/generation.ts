export const QUESTION_GENERATION_STRATEGY_OPTIONS = ["TFIDF", "RANDOM", "EMBEDDING"] as const;
export type QuestionGenerationStrategy = (typeof QUESTION_GENERATION_STRATEGY_OPTIONS)[number];
