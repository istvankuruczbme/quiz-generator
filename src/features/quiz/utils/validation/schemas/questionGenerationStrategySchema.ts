import z from "zod/v4";
import { QUESTION_GENERATION_STRATEGY_OPTIONS } from "../../../../question/constants/generation";

export const questionGenerationStrategySchema = z.union(
	QUESTION_GENERATION_STRATEGY_OPTIONS.map((option) => z.literal(option))
);
