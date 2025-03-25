import { FC, HTMLAttributes } from "react";
import useQuizSummary from "../../hooks/useQuizSummary";
import useUser from "../../../../contexts/UserContext/useUser";
import { Link } from "react-router-dom";
import "./Quiz.css";

type QuizProps = HTMLAttributes<HTMLDivElement>;

const Quiz: FC<QuizProps> = () => {
	// #region Hooks
	const { user } = useUser();
	const { quizSummary } = useQuizSummary();
	//#endregion

	if (quizSummary == null || user == null) return null;
	return (
		<div>
			<h1>{quizSummary.title}</h1>
			<p>{JSON.stringify(quizSummary)}</p>

			<div>
				{user.id === quizSummary.user.id && (
					<Link to="edit">
						<button tabIndex={-1}>Edit</button>
					</Link>
				)}
				<Link to="complete">
					<button tabIndex={-1}>Start quiz</button>
				</Link>
			</div>
		</div>
	);
};

export default Quiz;
