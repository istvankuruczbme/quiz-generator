import { Category } from "../../category/types/categoryTypes";
import { QuestionOrder } from "../assets/questionOrder";
import { QuestionPrivate, QuestionPublic } from "../../question/types/questionTypes";
import { UserPublic } from "../../user/types/userTypes";
import { QuizVisibility } from "../assets/quizVisibility";

// #region Quiz config
export type QuizConfig = Readonly<{
	state: "DRAFT" | "ACTIVE";
	visibility: QuizVisibility;
	questionOrder: QuestionOrder;
}>;
// #endregion

// #region Update quiz config
export type EditQuizConfigData = Partial<{
	visibility: QuizVisibility;
	questionOrder: QuestionOrder;
}>;
//#endregion

// #region Quiz data
type QuizData = Readonly<{
	id: string;
	title: string;
	description: string;
	photoUrl: string | null;
	embedding: number[];
	updatedAt: Date;
	createdAt: Date;
	config: QuizConfig;
	category: Category;
	user: UserPublic;
}>;
// #endregion

// #region Quiz summary
export type QuizSummary = QuizData &
	Readonly<{
		questionCount: number;
		completionCount: number;
	}>;
// #endregion

// #region Quiz public
export type QuizPublic = QuizData & {
	questions: QuestionPublic[];
	completionCount: number;
};
// #endregion

// #region Quiz private
export type QuizPrivate = QuizData & {
	questions: QuestionPrivate[];
	completionCount: number;
};
// #endregion
