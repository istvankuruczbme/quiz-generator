import { FC, HTMLAttributes } from "react";
import { QuizSummary as QuizSummaryType } from "../../../types/quizTypes";
// Components
import Text from "../../../../../components/ui/Text/Text";
import QuizCategory from "../QuizCard/QuizCategory/QuizCategory";
import { faCheckDouble, faQuestion } from "@fortawesome/free-solid-svg-icons";
import QuizCount from "../QuizCount/QuizCount";
// Hooks
import useUser from "../../../../../contexts/UserContext/useUser";
// Functions
import defaultUserPhotoUrl from "../../../../user/assets/defaultUserPhotoUrl";
import formatQuizDate from "../../../utils/fornatting/formatQuizDate";
// Variables
import defaultQuizPhotoUrl from "../../../assets/defaultQuizPhotoUrl";
// CSS
import "./QuizSummary.css";

type QuizSummaryProps = HTMLAttributes<HTMLDivElement> & {
	quiz: QuizSummaryType;
};

const QuizSummary: FC<QuizSummaryProps> = ({ quiz }) => {
	// #region Hooks
	const { user } = useUser();
	//#endregion

	// #region Variables
	const isQuizDraft = quiz.config.state === "DRAFT";
	// #endregion

	return (
		<div className="quizSummary">
			<header className="quizSummary__header">
				{isQuizDraft && <span className="quizSummary__draft">DRAFT</span>}

				<img
					src={quiz.photoUrl || defaultQuizPhotoUrl}
					alt={quiz.title}
					className="quizSummary__img"
				/>

				<div className="quizSummary__header__text">
					<h1 className="quizSummary__title">{quiz.title}</h1>
					<QuizCategory category={quiz.category} className="quizSummary__category" />
				</div>
			</header>

			<div className="quizSummary__body">
				<Text variant="neutral-400" mb="2rem">
					{quiz.description}
				</Text>

				<div className="quizSummary__counts">
					<QuizCount
						icon={faQuestion}
						title="Number of questions"
						count={quiz.questionCount}
					/>
					<QuizCount
						icon={faCheckDouble}
						title="Number of completions"
						count={quiz.completionCount}
					/>
				</div>

				<div className="quizSummary__user">
					<img
						src={quiz.user.photoUrl || defaultUserPhotoUrl}
						alt={user?.name}
						className="quizSummary__user__photo"
					/>
					<span className="quizSummary__user__name">{quiz.user.name}</span>

					<span className="quizSummary__user__divider"></span>

					<span className="quizSummary__user__date">
						{formatQuizDate(new Date(quiz.updatedAt))}
					</span>
				</div>
			</div>
		</div>
	);
};

export default QuizSummary;
